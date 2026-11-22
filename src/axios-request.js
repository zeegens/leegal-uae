import axios from "axios";
import { store } from "./redux/store";
import { setAccessToken, logout } from "./redux/slices/user-slice";

// override with VITE_API_URL if needed
export const serverURL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? "http://localhost:8000" : "https://api.leegal.co");

const axiosRequest = axios.create({
    baseURL: serverURL,
    withCredentials: true, // required to send and receive HttpOnly cookies
});

// 1. Request Interceptor: Attach access token from Redux memory only
axiosRequest.interceptors.request.use(
    (config) => {
        const token = store.getState().user?.accessToken;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Single-flight refresh state and promise queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// 3. Response Interceptor: 401 handling with single-flight token rotation
axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isAuthEndpoint = originalRequest?.url?.includes("/api/auth/");

        // If 401 and not already retried or an auth endpoint
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
            if (isRefreshing) {
                // If a refresh is already in-flight, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return axiosRequest(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Browser automatically includes the HttpOnly refresh cookie via withCredentials: true
                const { data } = await axios.post(
                    `${serverURL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = data.accessToken;

                // Update Redux state in memory
                store.dispatch(setAccessToken(newAccessToken));

                // Resolve all waiting requests with the new access token
                processQueue(null, newAccessToken);

                // Retry original request with new access token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosRequest(originalRequest);
            } catch (refreshError) {
                // Refresh failed or revoked (e.g., token expired or reuse detected)
                processQueue(refreshError, null);
                // Clear Redux authentication state
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosRequest;

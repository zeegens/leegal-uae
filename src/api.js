import axiosRequest, { serverURL } from "./axios-request";

const post_data = async (url, body) => {
    try {
        const response = await axiosRequest.post(`/api/${url}`, body);
        return response.data;
    } catch (e) {
        const errorData = e?.response?.data;
        const errorMessage = errorData?.message || e?.message || "An unexpected error occurred";
        const err = new Error(errorMessage);
        err.data = errorData;
        throw err;
    }
};

const get_data = async (url) => {
    try {
        const response = await axiosRequest.get(`/api/${url}`);
        return response.data;
    } catch (e) {
        const errorData = e?.response?.data;
        const errorMessage = errorData?.message || e?.message || "An unexpected error occurred";
        const err = new Error(errorMessage);
        err.data = errorData;
        throw err;
    }
};

export {
    serverURL,
    post_data,
    get_data,
};

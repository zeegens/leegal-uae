import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        user_data: null,
        accessToken: null, // Stored strictly in Redux memory only
    },
    reducers: {
        setCredentials: (state, action) => {
            state.isLoggedIn = true;
            state.user_data = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            if (action.payload && action.payload.user) {
                state.user_data = action.payload.user;
                if (action.payload.accessToken) {
                    state.accessToken = action.payload.accessToken;
                }
            } else {
                state.user_data = action.payload;
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user_data = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, setAccessToken, login, logout } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const initialState = {
    loading: false,
    error: null,
    message: null,
};

const forgotResetPassSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {
        forgotPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        
        resetPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        
       

        clearAllErrors(state) {
            state.error = null;
            // state = state;
            state.message = null;
        },

    },
});

export const forgotPassword = (email) => async (dispatch) => {

    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    console.log("API URL:", loginUrl);
  console.log("Sending Email:", email);

    try {

        const { data } = await axios.post(`${loginUrl}/api/v1/admin/forgot/password`, { email}, { withCredentials: true, headers: { "Content-Type": "application/json" } });
        dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
        // dispatch(forgotResetPassSlice.actions.clearAllErrors());
        console.log("API Response:", data);

    } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Password Reset failed. Please try again later.";
    dispatch(forgotResetPassSlice.actions.forgotPasswordFailed(errorMessage));
        console.error("API Error:", error.response);

    }
};

export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
    try {

        const { data } = await axios.put(`${loginUrl}/api/v1/admin/reset/password/${token}`,
            { password, confirmPassword },
             { withCredentials: true, headers: { "Content-Type": "application/json" } });
        dispatch(forgotResetPassSlice.actions.resetPasswordSuccess(data.message));
        // console.log("API Response:", data + "\n"+  message);
        // dispatch(forgotResetPassSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(forgotResetPassSlice.actions.resetPasswordFailed(error.response.data.message || "Password Reset failed."));
    }
};


export const clearAllForgotPasswordErrors = ()=>(dispatch)=>{
    dispatch(forgotResetPassSlice.actions.clearAllErrors());
};


export default forgotResetPassSlice.reducer;

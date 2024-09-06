import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const appsUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const appSlice = createSlice({
    name: "apps", 
    initialState: {
        loading: false,
        appicons: [], // Updated from 'icons' to 'appicons'
        error: null,
        message: null,
        isUpdated: false,
    },
    reducers: {
        getAllAppiconsRequest(state) {
            state.loading = true;
            state.appicons = []; // Updated from 'icons' to 'appicons'
            state.message = null;
            state.error = null;
        },
        getAllAppiconsSuccess(state, action) {
            state.loading = false;
            state.appicons = action.payload; // Updated from 'icons' to 'appicons'
            state.error = null;
        },
        getAllAppiconsFailed(state, action) {
            state.loading = false;
            state.appicons = []; // Updated from 'icons' to 'appicons'
            state.error = action.payload;
        },
        addAppiconRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        addAppiconSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        addAppiconFailed(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },
        updateAppiconRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        updateAppiconSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
            state.isUpdated = true;
        },
        updateAppiconFailed(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
            state.isUpdated = false;
        },
        deleteAppiconRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        deleteAppiconSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        deleteAppiconFailed(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },
        resetAppSlice(state) {
            state.loading = false;
            state.appicons = state.appicons; // Updated from 'icons' to 'appicons'
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        clearAllErrors(state) {
            state.error = null;
            state.appicons = state.appicons; // Updated from 'icons' to 'appicons'
        },
    }
});

export const getAllAppicons = () => async (dispatch) => {
    dispatch(appSlice.actions.getAllAppiconsRequest());
    try {
        const { data } = await axios.get(`${appsUrl}/api/v1/apps/getallapps/`, { withCredentials: true });
        dispatch(appSlice.actions.getAllAppiconsSuccess(data.data));
        dispatch(appSlice.actions.clearAllErrors());
        console.log("Data is:", data);
    } catch (error) {
        dispatch(appSlice.actions.getAllAppiconsFailed(error.response.data.message));
    }
};

export const addAppicon = (appiconData) => async (dispatch) => {
    dispatch(appSlice.actions.addAppiconRequest());
    try {
        console.log("Data coming from frontend to slice: ", appiconData);
        const { data } = await axios.post(`${appsUrl}/api/v1/apps/addapps`, appiconData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(appSlice.actions.addAppiconSuccess(data.message));
        dispatch(appSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(appSlice.actions.addAppiconFailed(error.response.data.message));
    }
};

export const updateAppicon = () => async (dispatch) => {
    // Define this function as needed
};

export const deleteAppicon = (id) => async (dispatch) => {
    dispatch(appSlice.actions.deleteAppiconRequest());
    try {
        const { data } = await axios.delete(`${appsUrl}/api/v1/apps/deleteapps/${id}`, { withCredentials: true });
        dispatch(appSlice.actions.deleteAppiconSuccess(data.message));
        dispatch(appSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(appSlice.actions.deleteAppiconFailed(error.response.data.message));
    }
};

export const clearAllAppiconsErrors = () => (dispatch) => {
    dispatch(appSlice.actions.clearAllErrors());
};

export const resetAppSlice = () => (dispatch) => {
    dispatch(appSlice.actions.resetAppSlice());
};

export default appSlice.reducer;

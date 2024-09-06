import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const loginUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false,
        isCreated : false,


    },
    reducers: {
        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null;

        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.message = action.payload;

        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null;

        },
        loadUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null;

        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.message = action.payload;

        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null;

        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = action.payload;
            state.error = null;
            state.message = action.payload;

        },
        logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
            state.message = null;

        },
        updatePasswordRequest(state) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updatePasswordSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action) {
            state.loading = false;  // Set loading to false
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },
        updateProfileRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action) {
            state.loading = false;  // Set loading to false
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },
        createProfileRequest(state, action) {
            state.loading = true;
            state.isCreated = false;
            state.message = null;
            state.error = null;
        },
        createProfileSuccess(state, action) {
            state.loading = false;
            state.isCreated = true;
            state.message = action.payload;
            state.error = null;
        },
        createProfileFailed(state, action) {
            state.loading = false;  // Set loading to false
            state.isCreated = false;
            state.message = null;
            state.error = action.payload;
        },
        updateProfileResetAfterUpdate(state, action) {
            state.error = null;
            state.isUpdated = false; // Reset isUpdated
            state.message = null;
        },

        clearAllErrors(state, action) {
            state.error = null;
            state.user = state.user;
            state.message = null;
        }
    },

});


export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());

    try {
        const { data } = await axios.post(`${loginUrl}/api/v1/admin/signin`, { email, password },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.loginSuccess(data.user));
        // dispatch(userSlice.actions.clearAllErrors());

    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }


};


export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());

    try {
        const { data } = await axios.get(`${loginUrl}/api/v1/admin/user`,
            { withCredentials: true }
        );
        dispatch(userSlice.actions.loadUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());

    } catch (error) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
    }


};


export const logout = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${loginUrl}/api/v1/admin/signout`, { withCredentials: true });
        dispatch(userSlice.actions.logoutSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message || "Logout failed."));
    }
};



export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const { data } = await axios.put(`${loginUrl}/api/v1/admin/update/password`, { currentPassword, newPassword, confirmNewPassword }, 
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.updatePasswordSuccess(data.message));
        // dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.updatePasswordFailed(error.response.data.message));
    }
};

export const updateProfile = (profileData) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const { data } = await axios.put(`${loginUrl}/api/v1/admin/update/userprofile`, profileData, 
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(userSlice.actions.updateProfileSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.updateProfileFailed(error.response.data.message));
    }
};


export const createProfile = (newData) => async (dispatch) => {
    dispatch(userSlice.actions.createProfileRequest());
    try {
        const { data } = await axios.post(`${loginUrl}/api/v1/admin/create/profile/user/onlyauthrizedadmins`, newData, 
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(userSlice.actions.createProfileSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.createProfileFailed(error.response.data.message));
    }
};

export const resetProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};




export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
}

export default userSlice.reducer;
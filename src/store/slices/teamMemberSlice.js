import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const teamMemberUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const teamMemberSlice = createSlice({
    name: "teamMembers", 
    initialState:{
        loading: false,
        teamMembers: [],
        error: null,
        message: null,
        isUpdated: false,
    },
    reducers: {
        getAllTeamMemberRequest(state, action){
            state.loading = true;
            state.teamMembers = [];
            state.message = null;
            state.error = null;
        },
        getAllTeamMemberSuccess(state, action){
            state.loading = false;
            state.teamMembers = action.payload;
            state.error = null;
        },
        getAllTeamMemberFailed(state, action){
            state.loading = false;
            state.teamMembers = [];
            state.error = action.payload;
        },
        addTeamMemberRequest(state, action){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        addTeamMemberSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        addTeamMemberFailed(state, action){
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },
        updateTeamMemberRequest(state, action){
            state.loading = true;
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        updateTeamMemberSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
            state.isUpdated = true;
        },
        updateTeamMemberFailed(state, action){
            state.loading = false;
            state.message = null;
            state.error = action.payload;
            state.isUpdated = false;
        },
        deleteTeamMemberRequest(state, action){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        deleteTeamMemberSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        deleteTeamMemberFailed(state, action){
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },

        resetTeamMemberSlice(state, action){
            state.loading = false;
            state.teamMembers = state.teamMembers;
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.teamMembers = state.teamMembers;
        },
    }
});

export const getAllTeamMember = () => async (dispatch) => {
    dispatch(teamMemberSlice.actions.getAllTeamMemberRequest());
    try {
        const { data } = await axios.get(`${teamMemberUrl}/api/v1/member/getallmembers/`,
            { withCredentials: true }
        );

        dispatch(teamMemberSlice.actions.getAllTeamMemberSuccess(data.getallmembers));
        dispatch(teamMemberSlice.actions.clearAllErrors());
        console.log("Data is:", data);
    } catch (error) {
        dispatch(teamMemberSlice.actions.getAllTeamMemberFailed(error.response.data.message));
    };
};

export const addTeamMember = (teamMemberData) => async (dispatch) => {
    dispatch(teamMemberSlice.actions.addTeamMemberRequest());
    try {
        const response = await axios.post(`${teamMemberUrl}/api/v1/member/addmember`, teamMemberData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(teamMemberSlice.actions.addTeamMemberSuccess(response.data.message));
        dispatch(teamMemberSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(teamMemberSlice.actions.addTeamMemberFailed(error.response.data.message));
    }
};

export const updateTeamMember = () => async (dispatch) => {
    // Update team member logic here
};

export const deleteTeamMember = (id) => async (dispatch) => {
    dispatch(teamMemberSlice.actions.deleteTeamMemberRequest());
    try {
        const response = await axios.delete(`${teamMemberUrl}/api/v1/member/updatemember/${id}`, {
            withCredentials: true,
        });
        dispatch(teamMemberSlice.actions.deleteTeamMemberSuccess(response.data.message));
        dispatch(teamMemberSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(teamMemberSlice.actions.deleteTeamMemberFailed(error.response.data.message));
    }
};

export const clearAllTeamMemberErrors = () => (dispatch) => {
    dispatch(teamMemberSlice.actions.clearAllErrors());
};
export const resetTeamMemberSlice = () => (dispatch) => {
    dispatch(teamMemberSlice.actions.resetTeamMemberSlice());
};

export default teamMemberSlice.reducer;

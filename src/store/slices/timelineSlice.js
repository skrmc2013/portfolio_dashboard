import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const timeLineUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const timelineSlice = createSlice({
    name: "timelines",
    initialState: {
        loading: false,
        timeline: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllTimelineRequest(state, action) {
            state.loading = true,
            state.timeline = [];
            state.error = null;
            // state.message=null;
        },
        getAllTimelineSuccess(state, action) {
            state.loading = false,
            state.timeline = action.payload;
            state.error = null;
            // state.message=action.payload;
        },
        getAllTimelineFailed(state, action) {
            state.loading = false,
            state.timeline = [];
            state.error = action.payload;
            // state.message=null;
        },
        addTimelineRequest(state, action) {
            state.loading = true,
            // state.timeline = [];
            state.error = null;
            state.message=null;
        },
        addTimelineSuccess(state, action) {
            state.loading = false,
            // state.timeline = action.payload;
            state.error = null;
            state.message=action.payload;
        },
        addTimelineFailed(state, action) {
            state.loading = false,
            // state.timeline = [];
            state.error = action.payload;
            state.message=null;
        },
        deleteTimelineRequest(state, action) {
            state.loading = true,
                // state.messages = [];
            state.error = null;
            state.message = null;
        },
        deleteTimelineSuccess(state, action) {
            state.loading = false,
                // state.messages = action.payload;
            state.error = null;
            state.message = action.payload;
        },
        deleteTimelineFailed(state, action) {
            state.loading = false,
                // state.messages = [];
                state.error = action.payload;
            state.message = null;
        },
        resetTimelineSlice(state, action) {
            state.error = null;
            state.timeline = state.timeline;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.timeline = state.timeline;
            state.loading=false;
        }
    }
});


export const getAllTimeline = () => async (dispatch) => {
    dispatch(timelineSlice.actions.getAllTimelineRequest());
    try {

        const { data } = await axios.get(`${timeLineUrl}/api/v1/timeline/getalltimeline`,
            { withCredentials: true }
        );

        dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message));

    }

};


export const deleteTimeline = (id) => async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {

        const { data } = await axios.delete(`${timeLineUrl}/api/v1/timeline/deletetimeline/${id}`,
            { withCredentials: true }
        );
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));

    }

};

export const addTimeline = (dataTimeline) => async (dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest());
    try {

        const { data } = await axios.post(`${timeLineUrl}/api/v1/timeline/addtimeline/`, dataTimeline,
            { withCredentials: true , headers: { "Content-Type": "application/json" }},
            
        );
        dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));

    }

};

export const clearAllTimelinesErrros = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());

};

export const resetTimelineSlice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice());
}

export default timelineSlice.reducer;
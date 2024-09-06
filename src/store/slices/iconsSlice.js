import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const iconsUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const iconsSlice = createSlice({
    name: "icons", 
    initialState:{
        loading: false,
        icons: [],
        error: null,
        message:null,
        isUpdated:false,
    },
    reducers: {
        getAllIconsRequest(state, action){
            state.loading=true;
            state.icons = [];
            state.message = null;
            state.error = null;

        },
        getAllIconsSuccess(state, action){
            state.loading=false;
            state.icons = action.payload;
            // state.message = action.payload;
            state.error = null;
        },
        getAllIconsFailed(state, action){
            state.loading=false;
            state.icons = [];
            // state.message = null;
            state.error = action.payload;
        },
        addIconRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
        },
        addIconSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
        },
        addIconFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
        },
        updateIconRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        updateIconSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
            state.isUpdated = true;
        },
        updateIconFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
            state.isUpdated = false;
        },
        deleteIconRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
        },
        deleteIconSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
        },
        deleteIconFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
        },

        resetIconSlice(state, action){
            state.loading=false;
            state.icons = state.icons;
            state.message = null;
            state.error = null;
            state.isUpdated= false;
        },
         clearAllErrors(state, action){
            state.error=null;
            state.icons= state.icons;
         },
    }
});

export const getAllIcons = () =>  async(dispatch)=>{
    dispatch(iconsSlice.actions.getAllIconsRequest());
    try {

        const { data } = await axios.get(`${iconsUrl}/api/v1/apps/getallicons/`,
            { withCredentials: true }
        );

        dispatch(iconsSlice.actions.getAllIconsSuccess(data.data));
        dispatch(iconsSlice.actions.clearAllErrors());
        console.log("Data is:", data);
    } catch (error) {
        dispatch(iconsSlice.actions.getAllIconsFailed(error.response.data.message));

    };
};

export const  addIcon = (iconsData)=>async(dispatch)=>{
dispatch(iconsSlice.actions.addIconRequest());
try{
    console.log("Data coming from frontend to slice: ", iconsData);
    const {data} = await axios.post(`${iconsUrl}/api/v1/apps/addicon`, 
        iconsData,
        {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        }
     );
     dispatch(iconsSlice.actions.addIconSuccess(data.message));
     dispatch(iconsSlice.actions.clearAllErrors());
}catch(error){
dispatch(iconsSlice.actions.addIconFailed(error.response.data.message));
}
};


export const  updateSkill = ()=>async(dispatch)=>{

};

export const  deleteIcon = (id)=>async(dispatch)=>{
    dispatch(iconsSlice.actions.deleteIconRequest());
    try{
        const {data} = await axios.delete(`${iconsUrl}/api/v1/apps/deleteicon/${id}`,
            { withCredentials: true },
        );
        dispatch(iconsSlice.actions.deleteIconSuccess(data.message));
        dispatch(iconsSlice.actions.clearAllErrors());

    }catch(error){
        dispatch(iconsSlice.actions.deleteIconFailed(error.response.data.message));
    }

};

export const clearAllIconsErrors = ()=>(dispatch)=>{
    dispatch(iconsSlice.actions.clearAllErrors());
};
export const resetIconsSlice = ()=>(dispatch)=>{
    dispatch(iconsSlice.actions.resetIconSlice());
};

export default iconsSlice.reducer;
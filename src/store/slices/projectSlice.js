import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const projectUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const projectSlice = createSlice({
    name: "projects", 
    initialState:{
        loading: false,
        projects: [],
        error: null,
        message:null,
        isUpdated:false,
        singleproject:{},
    },
    reducers: {
        getAllProjectRequest(state, action){
            state.loading=true;
            state.projects = [];
            state.message = null;
            state.error = null;
            state.singleproject ={};

        },
        getAllProjectSuccess(state, action){
            state.loading=false;
            state.projects = action.payload;
            // state.message = action.payload;
            state.error = null;
            state.singleproject ={};
        },
        getAllProjectsFailed(state, action){
            state.loading=false;
            state.projects = [];
            // state.message = null;
            state.error = action.payload;
            state.singleproject ={};
        },
        addProjectRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
            state.singleproject ={};
        },
        addProjectSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
        },
        addProjectFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
        },
        updateProjectRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        updateProjectSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
            state.isUpdated = true;
        },
        updateProjectFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
            state.isUpdated = false;
        },
        deleteProjectRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
        },
        deleteProjectSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
        },
        deleteProjectFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
        },
        getSingleProjectRequest(state, action){
            state.loading=true;
            state.singleproject = {};
            state.message = null;
            state.error = null;
        },
        getSingleProjectSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            // state.message = action.payload;
            state.singleproject = action.payload;
            state.error = null;
        },
        getSingleProjectFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.singleproject = {};
            state.message = null;
            state.error = action.payload;
        },

        resetProjectSlice(state, action){
            state.loading=false;
            state.projects = state.projects;
            state.message = null;
            state.error = null;
            state.isUpdated= false;
        },
         clearAllErrors(state, action){
            state.error=null;
            state.projects= state.projects;
         },
         resetSingleProjectSlice(state, action){
            state.loading=false;
            state.singleproject = state.singleproject;
            state.message = null;
            state.error = null;
         },

    }
});

export const getAllProject = () =>  async(dispatch)=>{
    dispatch(projectSlice.actions.getAllProjectRequest());
    try {

        const { data } = await axios.get(`${projectUrl}/api/v1/project/getallprojects/`,
            { withCredentials: true }
        );

        dispatch(projectSlice.actions.getAllProjectSuccess(data.projectsdata));
        dispatch(projectSlice.actions.clearAllErrors());
        console.log("Data is:", data);
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectsFailed(error.response.data.message));

    };
};

export const  addProject = (projectData)=>async(dispatch)=>{
dispatch(projectSlice.actions.addProjectRequest());
try{
    const response = await axios.post(`${projectUrl}/api/v1/project/addproject`, projectData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        }
     );
     dispatch(projectSlice.actions.addProjectSuccess(response.data.message));
     dispatch(projectSlice.actions.clearAllErrors());
}catch(error){
dispatch(projectSlice.actions.addProjectFailed(error.response.data.message));
}
};


export const  updateProject = (id, projectData)=>async(dispatch)=>{
    dispatch(projectSlice.actions.updateProjectRequest());
    try{
        const response = await axios.put(`${projectUrl}/api/v1/project/updateproject/${id}`, projectData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
         );
         dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
         dispatch(projectSlice.actions.clearAllErrors());
    }catch(error){
    dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message));
    } 
};

export const  deleteProject = (id)=>async(dispatch)=>{
dispatch(projectSlice.actions.deleteProjectRequest());
try{
    const response = await axios.delete(`${projectUrl}/api/v1/project/deleteproject/${id}`, {
        withCredentials: true,
       
    }
 );
 dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
 dispatch(projectSlice.actions.clearAllErrors());
}catch(error){
    dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message));
}
};

export const getSingleProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.getSingleProjectRequest());
    try {
        // Log the URL to ensure it's correct
        console.log(`Fetching data from: ${projectUrl}/api/v1/project/getsingleproject/${id}`);
        
        // Perform the GET request and log the raw response
        const response = await axios.get(`${projectUrl}/api/v1/project/getsingleproject/${id}`, {
            withCredentials: true,
        });

        console.log("Full response of single project:", response);

        // Log the data specifically
        const { data } = response;
        console.log("Project data:", data.getproject);

        dispatch(projectSlice.actions.getSingleProjectSuccess(data.getproject));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        console.error("Error fetching project data:", error.response ? error.response.data.message : error.message);
        dispatch(projectSlice.actions.getSingleProjectFailed(error.response ? error.response.data.message : error.message));
    }
};
export const clearAllProjectErrors = ()=>(dispatch)=>{
    dispatch(projectSlice.actions.clearAllErrors());
};
export const resetProjectSlice = ()=>(dispatch)=>{
    dispatch(projectSlice.actions.resetProjectSlice());
};

export const resetSingleProjectSlice = ()=>(dispatch)=>{
    dispatch(projectSlice.actions.resetSingleProjectSlice());
}

export default projectSlice.reducer;
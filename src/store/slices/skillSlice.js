import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const skillUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const skillSlice = createSlice({
    name: "skill", 
    initialState:{
        loading: false,
        skills: [],
        error: null,
        message:null,
        isUpdated:false,
    },
    reducers: {
        getAllSkillsRequest(state, action){
            state.loading=true;
            state.skills = [];
            state.message = null;
            state.error = null;

        },
        getAllSkillsSuccess(state, action){
            state.loading=false;
            state.skills = action.payload;
            // state.message = action.payload;
            state.error = null;
        },
        getAllSkillsFailed(state, action){
            state.loading=false;
            state.skills = [];
            // state.message = null;
            state.error = action.payload;
        },
        addSkillsRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
        },
        addSkillsSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
        },
        addSkillsFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
        },
        updateSkillRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        updateSkillSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
            state.isUpdated = true;
        },
        updateSkillFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
            state.isUpdated = false;
        },
        deleteSkillRequest(state, action){
            state.loading=true;
            // state.skills = [];
            state.message = null;
            state.error = null;
        },
        deleteSkillsSuccess(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = action.payload;
            state.error = null;
        },
        deleteSkillsFailed(state, action){
            state.loading=false;
            // state.skills = [];
            state.message = null;
            state.error = action.payload;
        },

        resetSkillSlice(state, action){
            state.loading=false;
            state.skills = state.skills;
            state.message = null;
            state.error = null;
            state.isUpdated= false;
        },
         clearAllErrors(state, action){
            state.error=null;
            state.skills= state.skills;
         },
    }
});

export const getAllSkills = () =>  async(dispatch)=>{
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {

        const { data } = await axios.get(`${skillUrl}/api/v1/skills/getallskills/`,
            { withCredentials: true }
        );

        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skillsdata));
        dispatch(skillSlice.actions.clearAllErrors());
        console.log("Data is:", data);
    } catch (error) {
        dispatch(skillSlice.actions.getAllSkillsFailed(error.response.data.message));

    };
};

export const  addSkill = (skillData)=>async(dispatch)=>{
dispatch(skillSlice.actions.addSkillsRequest());
try{
    const response = await axios.post(`${skillUrl}/api/v1/skills/createskill`, skillData, 
        {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        }
     );
     dispatch(skillSlice.actions.addSkillsSuccess(response.data.message));
     dispatch(skillSlice.actions.clearAllErrors());
}catch(error){
dispatch(skillSlice.actions.addSkillsFailed(error.response.data.message));
}
};


export const  updateSkill = (id, dataSkill)=>async(dispatch)=>{
    dispatch(skillSlice.actions.updateSkillRequest());
    try{
        const data = await axios.put(`${skillUrl}/api/v1/skills/updateskill/${id}`, dataSkill,  {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        } );
        dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
     dispatch(skillSlice.actions.clearAllErrors());
    }catch(error){
        dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
    }
    
    
};

export const  deleteSkill = (id)=>async(dispatch)=>{
dispatch(skillSlice.actions.deleteSkillRequest());
try{
    const response = await axios.delete(`${skillUrl}/api/v1/skills/deleteskill/${id}`,  {
        withCredentials: true,
       
    }
 );
 dispatch(skillSlice.actions.deleteSkillsSuccess(response.data.message));
 dispatch(skillSlice.actions.clearAllErrors());
}catch(error){
    dispatch(skillSlice.actions.deleteSkillsFailed(error.response.data.message));
}
};

export const clearAllSkillsErrors = ()=>(dispatch)=>{
    dispatch(skillSlice.actions.clearAllErrors());
};
export const resetSkillSlice = ()=>(dispatch)=>{
    dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
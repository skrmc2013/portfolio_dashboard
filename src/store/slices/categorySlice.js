import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const categoryUrl = import.meta.env.VITE_MY_DASHBOARD_PUBLIC_URL;

const categorySlice = createSlice({
    name: "categories", 
    initialState:{
        loading: false,
        categories: [],
        error: null,
        message: null,
        isUpdated: false,
    },
    reducers: {
        getAllCategoryRequest(state, action){
            state.loading = true;
            state.categories = [];
            state.message = null;
            state.error = null;
        },
        getAllCategorySuccess(state, action){
            state.loading = false;
            state.categories = action.payload;
            state.error = null;
        },
        getAllCategoryFailed(state, action){
            state.loading = false;
            state.categories = [];
            state.error = action.payload;
        },
        addCategoryRequest(state, action){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        addCategorySuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        addCategoryFailed(state, action){
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },
        updateCategoryRequest(state, action){
            state.loading = true;
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        updateCategorySuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
            state.isUpdated = true;
        },
        updateCategoryFailed(state, action){
            state.loading = false;
            state.message = null;
            state.error = action.payload;
            state.isUpdated = false;
        },
        deleteCategoryRequest(state, action){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        deleteCategorySuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        deleteCategoryFailed(state, action){
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },

        resetCategorySlice(state, action){
            state.loading = false;
            state.categories = state.categories;
            state.message = null;
            state.error = null;
            state.isUpdated = false;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.categories = state.categories;
        },
    }
});

export const getAllCategory = () => async (dispatch) => {
    dispatch(categorySlice.actions.getAllCategoryRequest());
    try {
        const { data } = await axios.get(`${categoryUrl}/api/v1/project/getallcategories/`,
            { withCredentials: true }
        );

        dispatch(categorySlice.actions.getAllCategorySuccess(data.categorydata));
        dispatch(categorySlice.actions.clearAllErrors());
        console.log("Data is:", data);
    } catch (error) {
        dispatch(categorySlice.actions.getAllCategoryFailed(error.response.data.message));
    };
};

export const addCategory = (categoryData) => async (dispatch) => {
    dispatch(categorySlice.actions.addCategoryRequest());
    try {
        const response = await axios.post(`${categoryUrl}/api/v1/project/addcategory`, categoryData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(categorySlice.actions.addCategorySuccess(response.data.message));
        dispatch(categorySlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(categorySlice.actions.addCategoryFailed(error.response.data.message));
    }
};

export const updateCategory = () => async (dispatch) => {
    // Update category logic here
};

export const deleteCategory = (id) => async (dispatch) => {
    dispatch(categorySlice.actions.deleteCategoryRequest());
    try {
        const response = await axios.delete(`${categoryUrl}/api/v1/category/deletecategory/${id}`, {
            withCredentials: true,
        });
        dispatch(categorySlice.actions.deleteCategorySuccess(response.data.message));
        dispatch(categorySlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(categorySlice.actions.deleteCategoryFailed(error.response.data.message));
    }
};

export const clearAllCategoryErrors = () => (dispatch) => {
    dispatch(categorySlice.actions.clearAllErrors());
};
export const resetCategorySlice = () => (dispatch) => {
    dispatch(categorySlice.actions.resetCategorySlice());
};

export default categorySlice.reducer;

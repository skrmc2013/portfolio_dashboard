import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import messagesReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import iconsReducer from "./slices/iconsSlice";
import categoryReducer from "./slices/categorySlice";
import teamMemberReducer from "./slices/teamMemberSlice";
import projectReducer from "./slices/projectSlice";
import appReducer from "./slices/appSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPasswordReducer,
        messages: messagesReducer,
       timeline: timelineReducer,
       skill: skillReducer,
       icon: iconsReducer,
       category: categoryReducer,
       teammember: teamMemberReducer,
       project : projectReducer,
       app: appReducer,
    }
})
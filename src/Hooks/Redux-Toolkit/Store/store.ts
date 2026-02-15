import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/Auth.slice"


export const store  = configureStore({
    reducer:{
        auth: authReducer,
    }
})
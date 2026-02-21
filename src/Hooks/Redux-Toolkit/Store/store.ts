import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/Auth.slice"
import spareReducer from "../Slice/Spare.slice"
import cartReducer from "../Slice/Cart.slice"


export const store  = configureStore({
    reducer:{
        auth: authReducer,
        spare:spareReducer,
        cart:cartReducer
    }
})
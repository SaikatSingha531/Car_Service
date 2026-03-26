import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/Auth.slice"
import spareReducer from "../Slice/Spare.slice"
import cartReducer from "../Slice/Cart.slice"
import serviceReducer from "../Slice/Service.slice" 
import serviceCartReducer from "../Slice/serviceCartSlice"



export const store  = configureStore({
    reducer:{
        auth: authReducer,
        spare:spareReducer,
        service:serviceReducer,
        cart:cartReducer,
        serviceCart:serviceCartReducer,
    }
})
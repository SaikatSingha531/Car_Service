import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "../../../Typescript/interface/CartInterface";

const initialState:CartState ={
     cartProduct: [],
     count:0
}

 const cartSlice = createSlice({
   name: "cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existing = state.cartProduct.find((item)=>item.$id === action.payload.$id)

            if(existing){
                existing.quantity +=1
            }else{
                state.cartProduct.unshift({ ...action.payload, quantity: 1 })
                state.count += 1
            }
        }
    }
 })

 export const {addToCart}=cartSlice.actions;
 export default cartSlice.reducer
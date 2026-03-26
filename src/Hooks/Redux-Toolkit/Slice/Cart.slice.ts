import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../../../Typescript/interface/CartInterface";

const loadCartFromStorage =():CartState=>{
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : {cartProduct:[], count:0}
  } catch (error) {
    return {cartProduct:[], count:0}
  }
}

const saveCartToStorage =(state : CartState)=>{
  try {
    localStorage.setItem("cart" , JSON.stringify(state))
  } catch (error) {
    console.log(error)
  }
}

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🟢 ADD TO CART
    addToCart: (state, action:PayloadAction<any>) => {
      const existing = state.cartProduct.find(
        (item) => item.$id === action.payload.$id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartProduct.unshift({ ...action.payload, quantity: 1 });
        state.count += 1;
      }

      saveCartToStorage(state)
    },

    // 🔼 INCREASE QTY
    increaseQty: (state, action) => {
      const item = state.cartProduct.find(
        (i) => i.$id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state);
    },

    // 🔽 DECREASE QTY
    decreaseQty: (state, action) => {
      const item = state.cartProduct.find(
        (i) => i.$id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToStorage(state);
    },

    // ❌ REMOVE ITEM
    removeFromCart: (state, action) => {
      state.cartProduct = state.cartProduct.filter(
        (item) => item.$id !== action.payload
      );
      state.count = state.cartProduct.length;
      saveCartToStorage(state);
    },

    // 🧹 CLEAR CART
    clearCart: (state) => {
      state.cartProduct = [];
      state.count = 0;

      saveCartToStorage(state);
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
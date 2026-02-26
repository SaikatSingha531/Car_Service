import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "../../../Typescript/interface/CartInterface";

const initialState: CartState = {
  cartProduct: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🟢 ADD TO CART
    addToCart: (state, action) => {
      const existing = state.cartProduct.find(
        (item) => item.$id === action.payload.$id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartProduct.unshift({ ...action.payload, quantity: 1 });
        state.count += 1;
      }
    },

    // 🔼 INCREASE QTY
    increaseQty: (state, action) => {
      const item = state.cartProduct.find(
        (i) => i.$id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // 🔽 DECREASE QTY
    decreaseQty: (state, action) => {
      const item = state.cartProduct.find(
        (i) => i.$id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ❌ REMOVE ITEM
    removeFromCart: (state, action) => {
      state.cartProduct = state.cartProduct.filter(
        (item) => item.$id !== action.payload
      );
      state.count = state.cartProduct.length;
    },

    // 🧹 CLEAR CART
    clearCart: (state) => {
      state.cartProduct = [];
      state.count = 0;
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
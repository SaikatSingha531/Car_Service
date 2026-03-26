import { createSlice } from "@reduxjs/toolkit";
import type { SeviceState } from "../../../Typescript/interface/CartInterface";

const loadService = (): SeviceState => {
  try {
    const data = localStorage.getItem("serviceCart");
    return data ? JSON.parse(data) : { serviceProduct: [], count: 0 };
  } catch (error) {
    return { serviceProduct: [], count: 0 };
  }
};

const saveServiceToStorage = (state: SeviceState) => {
  try {
    localStorage.setItem("serviceCart", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const initialState: SeviceState = loadService();

const serviceCartSlice = createSlice({
  name: "serviceCart",
  initialState,
  reducers: {
    addService: (state, action) => {
      const existing = state.serviceProduct.find(
        (item) => item.$id === action.payload.$id,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.serviceProduct.unshift({
          $id: action.payload.$id,
          image: action.payload.image,
          name: action.payload.name,
          category: action.payload.category,
          duration: action.payload.duration,
          description: action.payload.description,
          price: action.payload.price,
          quantity: 1,
        });
      }
      state.count = state.serviceProduct.length;
      saveServiceToStorage(state);
    },

    increaseService: (state, action) => {
      const item = state.serviceProduct.find(
        (i) => i.$id === action.payload.$id,
      );

      if (item) {
        item.quantity += 1;
      }
      saveServiceToStorage(state);
    },

    decreaseService: (state, action) => {
      const item = state.serviceProduct.find(
        (i) => i.$id === action.payload.$id,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveServiceToStorage(state);
    },

    removeService: (state, action) => {
      state.serviceProduct = state.serviceProduct.filter(
        (i) => i.$id !== action.payload,
      );
      state.count = state.serviceProduct.length;
      saveServiceToStorage(state);
    },
  },
});

export const { addService, increaseService, decreaseService, removeService } =
  serviceCartSlice.actions;

export default serviceCartSlice.reducer;

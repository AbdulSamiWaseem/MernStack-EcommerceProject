import { createSlice } from "@reduxjs/toolkit";
import Product from "../pages/Product";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const productIndex = state.products.findIndex((p) => p._id === action.payload._id && p.color === action.payload.color && p.size === action.payload.size)
      if (productIndex > -1)
        state.products[productIndex].quantity += action.payload.quantity;
      else
        state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const productIndex = state.products.findIndex(product => product._id === action.payload._id);
      if (productIndex >= 0) {
        const product = state.products[productIndex];
        state.products.splice(productIndex, 1);
      }
    },
    incProduct: (state, action) => {
      const productIndex = state.products.findIndex(product => product._id === action.payload._id);
      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
      } else {
        console.log('Product not found');
      }
    },
    decProduct: (state, action) => {
      const productIndex = state.products.findIndex(product => product._id === action.payload._id);

      if (productIndex !== -1) {
        if (state.products[productIndex].quantity > 1) {
          state.products[productIndex].quantity -= 1;
        } else {
          state.products.splice(productIndex, 1);
        }
      }
    },
  },
});

export const { addProduct, deleteProduct, incProduct, decProduct } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    
    //DELETE
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    
    //UPDATE
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
    
    //ADD
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    
  },
});

export const {
  getProductSuccess,
  deleteProductSuccess,
  updateProductSuccess,
  addProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;

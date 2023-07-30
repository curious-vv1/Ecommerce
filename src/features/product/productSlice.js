import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProdutsByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsyc = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();

    return response.data;
  }
);

export const fetchProdutsByFiltersAsync = createAsyncThunk(
  "products/fetchProdutsByFilter",
  async (newFilter) => {
    const response = await fetchProdutsByFilters(newFilter);

    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsyc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsyc.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProdutsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProdutsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;

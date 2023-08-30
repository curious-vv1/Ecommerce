import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProdutsByFilters,fetchBrands,fetchCategory,fetchProductById, createProduct, updateProduct } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands:[],
  category:[],
  selectedProduct:null,
};

export const fetchAllProductsAsyc = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();

    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);

    return response.data;
  }
);

export const fetchProdutsByFiltersAsync = createAsyncThunk(
  "products/fetchProdutsByFilter",
  async ({filter,sort,pagination}) => {
    const response = await fetchProdutsByFilters(filter,sort,pagination);

    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await fetchBrands();

    return response.data;
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  "products/fetchCategory",
  async () => {
    const response = await fetchCategory();

    return response.data;
  }
);


export const createProductAsync = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    const response = await createProduct(product);

    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async (update) => {
    const response = await updateProduct(update);

    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
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
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;

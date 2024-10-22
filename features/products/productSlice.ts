import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import socket from '@/lib/socket';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number = 1) => {
    const response = await axios.get(`/api/products?page=${page}`);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    const response = await axios.get(`/api/products/search?q=${query}`);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, rating, comment }: { productId: string; rating: number; comment: string }) => {
    const response = await axios.post(`/api/products/${productId}/reviews`, { rating, comment });
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    searchResults: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    updateProductStock: (state, action: PayloadAction<{ productId: string; newStock: number }>) => {
      const product = state.products.find((p) => p._id === action.payload.productId);
      if (product) {
        product.countInStock = action.payload.newStock;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex((p) => p._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      });
  },
});

export const { updateProductStock } = productSlice.actions;

// Listen for real-time inventory updates
socket.on('inventoryUpdate', (data) => {
  productSlice.actions.updateProductStock(data);
});

export default productSlice.reducer;
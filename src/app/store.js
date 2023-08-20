import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

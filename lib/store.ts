import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import productReducer from '@/features/products/productSlice';
import userReducer from '@/features/user/userSlice';
import orderReducer from '@/features/orders/orderSlice';
import recommendationReducer from '@/features/recommendations/recommendationSlice';
import wishlistReducer from '@/features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
    orders: orderReducer,
    recommendations: recommendationReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
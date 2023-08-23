import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

const persistedCartData = localStorage.getItem("cartData");
const preloadedState = persistedCartData
  ? JSON.parse(persistedCartData).cart
  : {};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

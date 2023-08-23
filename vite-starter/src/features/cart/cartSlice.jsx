import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const getPersistedState = () => {
  const persistedCartData = localStorage.getItem("cartData");
  return persistedCartData ? JSON.parse(persistedCartData) : initialState;
};

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getPersistedState() || initialState,
  reducers: {
    clearCart: (state) => {
      localStorage.setItem(
        "cartData",
        JSON.stringify({ ...state, cartItems: [], amount: 0 })
      );

      return { ...state, cartItems: [], amount: 0 };
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    resetChanges: (state) => {
      return { ...state, cartItems: cartItems };
    },
  },
});
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotal,
  resetChanges,
} = cartSlice.actions;
export default cartSlice.reducer;

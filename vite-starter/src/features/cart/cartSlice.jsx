import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const saveStateToLocalStorage = (state) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

const initialState = JSON.parse(localStorage.getItem("cartState")) || {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      return { ...state, cartItems: [], amount: 0 };
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
});
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotal,
} = cartSlice.actions;

export default (state, action) => {
  const newState = cartSlice.reducer(state, action);
  saveStateToLocalStorage(newState);
  return newState;
};

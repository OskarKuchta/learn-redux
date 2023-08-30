import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/cart/cartSlice";
import modalReducer from "./features/modal/modalSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;

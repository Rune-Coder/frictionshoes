import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productStore';
import cartSlice from './cartStore';
import wishSlice from './wishStore';
import loginSlice from './loginStore';
import addressSlice from './addressStore';

const store = configureStore({
    reducer: {cart: cartSlice, wish: wishSlice, product: productSlice, login: loginSlice, address: addressSlice},
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
    items: []
};

const productSlice = createSlice({
    name: 'productItems',
    initialState: initialProductState,
    reducers: {
        fetchProducts(state, action){
            state.items = action.payload.items;
        }
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
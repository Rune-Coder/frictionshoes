import { createSlice } from "@reduxjs/toolkit";

const initialWishState = {
    items: localStorage.getItem("wishStore") ? JSON.parse(localStorage.getItem("wishStore")) : [], 
    len: localStorage.getItem("wishStore") ? JSON.parse(localStorage.getItem("wishStore")).length : 0,
    rem: false
};

const wishSlice = createSlice({
    name: 'wishItems',
    initialState: initialWishState,
    reducers: {
        addItem(state, action){
            const newItem = action.payload;
            const existItem = state.items.find(item => item.id === newItem.id);
            
            if(!existItem){
                state.items.push({
                    id: newItem.id,
                    image: newItem.image,
                    company: newItem.company,
                    product: newItem.product,
                    rating: newItem.rating,
                    sp: newItem.sp,
                    mrp: newItem.mrp,
                    discount: newItem.discount,
                });
                state.len++;
                localStorage.setItem("wishStore", JSON.stringify(state.items));
            }
        },
        removeItem(state, action){
            const delItem = action.payload;

            state.items = state.items.filter(item => item.id !== delItem.id);
            state.len--;
            state.rem = true;
            localStorage.setItem("wishStore", JSON.stringify(state.items));
            // || given to allow items of same size diff id & same id diff size
        },
        remAlert(state){
            state.rem = false;
        }
    },
});

export const wishActions = wishSlice.actions;

export default wishSlice.reducer;
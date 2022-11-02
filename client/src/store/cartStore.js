import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [], 
    bill: localStorage.getItem("billStore") ? JSON.parse(localStorage.getItem("billStore")) : [{ tmrp: 0, tdis: 0, tdelfee: 0, amount: 0, len: 0 }],
    openAlert: false,
    alertDetails: [{id: "", topic: "", sz: 0, value: 0}]
};

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: initialCartState,
    reducers: {
        addItem(state, action){
            const newItem = action.payload;
            const existItem = state.items.find(item => item.id === newItem.id && item.sz === newItem.sz);

            if(existItem && existItem.quantity === 10){
                return;
            }
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
                    quantity: 1,
                    sz: newItem.sz,
                    delfee: newItem.delfee,
                });
                state.bill[0].len++;
            }
            else{
                existItem.quantity++;
                existItem.mrp = existItem.mrp + newItem.mrp;
                existItem.sp = existItem.sp + newItem.sp;
            }

            state.bill[0].tmrp = state.bill[0].tmrp + newItem.mrp;
            state.bill[0].tdis = state.bill[0].tdis + newItem.mrp - newItem.sp;
            state.bill[0].tdelfee = state.bill[0].tdelfee + newItem.delfee;
            state.bill[0].amount = state.bill[0].tmrp - state.bill[0].tdis + state.bill[0].tdelfee;

            localStorage.setItem("products", JSON.stringify(state.items));
            localStorage.setItem("billStore", JSON.stringify(state.bill));
        },
        removeItem(state, action){
            const delItem = action.payload;
            const existItem = state.items.find(item => item.id === delItem.id && item.sz === delItem.sz);

            state.bill[0].tmrp = state.bill[0].tmrp - existItem.mrp;
            state.bill[0].tdis = state.bill[0].tdis - existItem.mrp + existItem.sp;
            state.bill[0].tdelfee = state.bill[0].tdelfee - existItem.delfee;
            state.bill[0].amount = state.bill[0].tmrp - state.bill[0].tdis + state.bill[0].tdelfee;
            --state.bill[0].len;

            state.items = state.items.filter(item => item.id !== delItem.id || item.sz !== delItem.sz);

            localStorage.setItem("products", JSON.stringify(state.items));
            localStorage.setItem("billStore", JSON.stringify(state.bill));
            
            // || given to allow items of same size diff id & same id diff size
        },
        open(state, action){
            const alertItems = action.payload;
            state.alertDetails = [];
            state.openAlert = !state.openAlert;
            state.alertDetails.push({
                id: alertItems.id,
                topic: alertItems.topic,
                sz: alertItems.sz,
                value: alertItems.value,
            });
        },
        done(state, action){
            const newItem = action.payload;
            const existItem = state.items.find(item => item.id === newItem.id && item.sz === newItem.sz);
            state.openAlert = !state.openAlert;

            if(newItem.topic === "Quantity"){
                state.bill[0].tmrp = state.bill[0].tmrp - existItem.mrp;
                state.bill[0].tdis = state.bill[0].tdis - existItem.mrp + existItem.sp;
                state.bill[0].tdelfee = state.bill[0].tdelfee - existItem.delfee;

                existItem.mrp = (existItem.mrp / existItem.quantity) * newItem.value;
                existItem.sp = (existItem.sp / existItem.quantity) * newItem.value;
                existItem.quantity =  newItem.value; 
                
                state.bill[0].tmrp = state.bill[0].tmrp + existItem.mrp;
                state.bill[0].tdis = state.bill[0].tdis + existItem.mrp - existItem.sp;
                state.bill[0].tdelfee = state.bill[0].tdelfee + existItem.delfee;
                state.bill[0].amount = state.bill[0].tmrp - state.bill[0].tdis + state.bill[0].tdelfee;
            }
            else{
                const existItemSize = state.items.find(item => item.id === newItem.id && item.sz === newItem.value);

                if(existItemSize){
                    state.bill[0].tmrp = state.bill[0].tmrp - existItem.mrp;
                    state.bill[0].tdis = state.bill[0].tdis - existItem.mrp + existItem.sp;
                    state.bill[0].tdelfee = state.bill[0].tdelfee - existItem.delfee;
                    state.bill[0].amount = state.bill[0].tmrp - state.bill[0].tdis + state.bill[0].tdelfee;
                    --state.bill[0].len;


                    state.items = state.items.filter(item => item.id !== existItem.id || item.sz !== existItem.sz);
                }
                else
                    existItem.sz = newItem.value;
            }

            localStorage.setItem("products", JSON.stringify(state.items));
            localStorage.setItem("billStore", JSON.stringify(state.bill));
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import CartEmpty from './cartEmpty';
import ProductItemCard from '../../card/productItemCard';
import ProductBillCard from '../../card/productBillCard';
import AlertCard from '../../card/alertCard';
import CheckoutMenu from './checkoutMenu';
import classes from './cart.module.css';

function Cart(props){

    useEffect(() => {
        document.title = 'Shopping Bag';
        window.scrollTo(0, 0);
    });

    var itemList = useSelector((state) => state.cart.items);

    const items = itemList.map((shoe) => (
        <ProductItemCard 
            key = {shoe.id+"s"+shoe.sz} 
            id = {shoe.id} 
            image = {shoe.image} 
            company = {shoe.company} 
            product = {shoe.product} 
            rating = {shoe.rating} 
            sp = {shoe.sp} 
            mrp = {shoe.mrp} 
            discount = {shoe.discount}
            quantity = {shoe.quantity}
            size = {shoe.sz}
        />
    ));

    var billUpdate = useSelector((state) => state.cart.bill);

    const billItems = billUpdate.map((shoe) => (
        <ProductBillCard 
            tmrp = {shoe.tmrp} 
            tdis = {shoe.tdis} 
            tdelfee = {shoe.tdelfee} 
            amount = {shoe.amount} 
            itemQty = {shoe.len}
            value = {"bill"}
        />
    ));
    

    const alertBox = useSelector((state) => state.cart.openAlert);


    return (
        <div>
            <div>
                <CheckoutMenu value = "bag" />
            </div>
            {billUpdate[0].len === 0 && <CartEmpty />}
            {billUpdate[0].len !== 0 && 
            <div className={classes.cart}>
                <div className={classes.cartItems}>{items}</div>
                <div className={classes.cartBill}>{billItems}</div>
                {alertBox && <div className= {classes.backdrop}/>}
                {alertBox && <div className={classes.alert}><AlertCard /></div>}
            </div>}
        </div>
    );
}

export default Cart;
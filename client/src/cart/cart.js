import React from 'react';
import ProductBillCard from '../../../card/productBillCard';
import classes from './cart.module.css';

function Cart(props){
    return (
        <div className={classes.cart}>
            <ProductBillCard />
        </div>
    );
}

export default Cart;
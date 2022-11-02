import React from 'react';

import { useNavigate } from 'react-router-dom';

import order from '../../image/order.jpg';
import classes from './ordersEmpty.module.css';

function OrdersEmpty(props){
    let navigate = useNavigate(); 

    function toHome(){ 
        let path = `/home`; 
        navigate(path);
    }

    return(
        <div className={classes.emptyOrder}>
            <img src = {order} alt = "Order"  className={classes.orderImg}></img>
            <p>You haven't placed any order yet</p>
            <p className={classes.subHead}>Order section is empty. After placing order, You can track them from here!</p>
            <button type='button' onClick={toHome}>START SHOPPING</button>
        </div>
    );
}

export default OrdersEmpty;
import React from 'react';
import OrderList from '../pages/orders/orderList';

import { useNavigate } from 'react-router-dom';

import classes from './ordersCard.module.css';

function OrdersCard(props){
    let navigate = useNavigate(); 

    const productList = props.products.map((order) => (
        <OrderList 
            key = {order.product} 
            company = {order.company}
            product = {order.product} 
        />
    ));

    function toOrderView(event){
        let path = `/orders/${props.id}`; 
        navigate(path);
    }
    return(
        <div className={classes.layout} onClick = {toOrderView}>
            <div className={classes.head}>
                <ul className={classes.orderDetails}>
                    <li>
                        <div>ORDER PLACED</div>
                        <div>{props.date}</div>
                    </li>
                    <li>
                        <div>TOTAL</div>
                        <div>&#8377;{props.bill[0].amount}</div>
                    </li>
                    <li>
                        <div>ORDER ID</div>
                        <div>#{props.id}</div>
                    </li>
                </ul>
            </div>
            <div className={classes.orderBody}>
                <ul className={classes.cartDetails}>
                    {productList}
                </ul>
            </div>
        </div>
        
    );
}

export default OrdersCard;
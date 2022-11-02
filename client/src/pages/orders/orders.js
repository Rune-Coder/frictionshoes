import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import OrdersEmpty from './ordersEmpty';
import classes from './orders.module.css';
import OrdersCard from '../../card/ordersCard';

function Orders(props){
    const userSub = useSelector((state) => state.login.userData);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        document.title = 'Online Shopping site for Shoes in India | Friction';
        window.scrollTo(0, 0);
    });

    useEffect(() =>{

        //get orders data mongodb
        async function getOrders(email){

            const res = await fetch("/api/user/history-get", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
        
            const data = await res.json();
                
            if(res.ok && data.orders)
                setOrders(data.orders);

        }
        getOrders(userSub.email);

    }, [userSub.email]);

    orders.reverse();
    const orderList = orders.map((order) => (
        <OrdersCard 
            key = {order.order_id} 
            id = {order.order_id}
            status = {order.status}
            bill = {order.bill} 
            products = {order.products} 
            payment = {order.payment} 
            address = {order.address} 
            date = {order.date} 
        />
    ));

    return(
        <div className={classes.orders}>
            {orders.length === 0 && <div><OrdersEmpty /></div>}

            {orders.length > 0 && <div className={classes.ordersCard}>
                <p className={classes.head}>Your Orders</p>
                {orderList}
            </div>}
        </div>
    );
}

export default Orders;
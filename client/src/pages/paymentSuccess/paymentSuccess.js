import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import BadgeCheckIcon from '../../icons/badgeCheckIcon';
import { useSelector, useDispatch } from 'react-redux';
import { addressActions } from '../../store/addressStore';
import classes from './paymentSuccess.module.css';

function PaymentSuccess(props){

    useEffect(() => {
        document.title = 'Online Shopping site for shoes in India | Friction';
        window.scrollTo(0, 0);
    });


    let navigate = useNavigate();
    const login = useSelector((state) => state.login.loggedin);

    useEffect(() =>{

        const address = localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : {};

        if(!login || !address.pin)
            navigate(`/`, { replace: true });

    }, [navigate, login]);

    
    const userSub = useSelector((state) => state.login.userData);

    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

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

    //post orders
    async function postOrders(email, orders){

        const cart = [];
        const bill = [];
        const res = await fetch("/api/user/history-create", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, cart, bill, orders })
        });
    
        await res.json();
    }


    function toOrder(event){

        const bill = localStorage.getItem("billStore") ? JSON.parse(localStorage.getItem("billStore")) : [{amount: 0}];
        const products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        const address = localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : {};

        var currOrder = orders.slice();
            currOrder.push({
                order_id: "",
                status: "processing",
                bill: bill,
                products: products,
                payment: "Online",
                address: address,
                date: ""
        });

        postOrders(userSub.email, currOrder);

        dispatch(addressActions.remAddress());

        navigate(`/orders`, { replace: true });

    }


    return(
        <div className={classes.layout}>
            <div><span className={classes.badge}><BadgeCheckIcon /></span></div>
            <p>Payment Successfull</p>
            <button onClick = {toOrder} className={classes.continue}>CONTINUE</button>
            <p className={classes.subHead}>Please do not go back or refresh page</p>
        </div>
    );
}

export default PaymentSuccess;
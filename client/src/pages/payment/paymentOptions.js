import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BadgeCheckIcon from '../../icons/badgeCheckIcon';
import classes from './paymentOptions.module.css';
import { addressActions } from '../../store/addressStore';
import preloader from '../../image/sectionLoader.gif';

function PaymentOptions(props){
    const bill = localStorage.getItem("billStore") ? JSON.parse(localStorage.getItem("billStore")) : [{amount: 0}];
    const products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    const address = useSelector((state) => state.address.currAddress);
    const userSub = useSelector((state) => state.login.userData);
    const [loader, setLoader] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([]);
    const [ops, setOps] = useState(" ");

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

    function toOrders(){
        navigate(`/orders`, { replace: true });
    }

    async function onlinePay(amount){

        setLoader(true);

        const res = await fetch("/api/payment/checkout", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        });
    
        const data = await res.json();
            
        if(res.ok && data)
            console.log(data);
        else
            return;

        const rzp_key = await fetch("/api/payment/key", {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });

        const rzpKeyData = await rzp_key.json();

        if(!rzp_key.ok || !rzpKeyData)
            return;
        setLoader(false);
        const options = {
            key: rzpKeyData, 
            amount: data.amount, 
            currency: "INR",
            name: "Friction",
            description: "Online Shopping site for Shoes in India",
            image: "/images/icon.png",
            order_id: data.id, 
            callback_url: "/api/payment/verification",
            prefill: {
                "name": userSub.name,
                "email": userSub.email,
                "contact": userSub.mobile
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#446A46"
            }
        };
        var razor = new window.Razorpay(options);
        razor.open();
    }

    function pay(event){

        if(ops === " ")
            return;
        else if(ops === "cash"){

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;

            var currOrder = orders.slice();
            currOrder.push({
                order_id: "",
                status: "processing",
                bill: bill,
                products: products,
                payment: "Cash",
                address: address,
                date: today
            });

            postOrders(userSub.email, currOrder);

            dispatch(addressActions.remAddress());

            toOrders();

        }
        else{
            onlinePay(bill[0].amount);
        }
    }

    return(
        <div className={classes.paymentCard}>
            <div className={classes.summary}>
                Order Total &#8377; {bill[0].amount}
            </div>
            PAYMENT OPTIONS
            <ul className={classes.paymentOps}>
                <li onClick = {() => setOps("cash")}>
                    <div className={classes.selectOps}>Cash On Delivery
                    {ops === "cash" && <span className={classes.check}><BadgeCheckIcon /></span>}</div>
                </li>
                <li onClick = {() => setOps("online")}>  
                    <div className={classes.selectOps}>Pay Now
                    {ops === "online" && <span className={classes.check}><BadgeCheckIcon /></span>}</div>
                    <div className={classes.subHead}>Debit Card, Credit Card, Net Banking, UPI</div>
                </li>
                <li><button onClick = {pay} className={classes.continue}>CONTINUE</button></li>
                
            </ul>
            {loader && <img src = {preloader} className={classes.load} alt = "Loading..."></img>}
        </div>
    );
}

export default PaymentOptions;
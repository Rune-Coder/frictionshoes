import React, {useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import OrderProductCard from '../../card/orderProductCard';
import loader from '../../image/sectionLoader.gif';
import classes from './orderView.module.css';
import PhoneIcon from '../../icons/phoneIcon';

function OrderView(props){
    const {oid} = useParams();
    const userSub = useSelector((state) => state.login.userData);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        document.title = 'Order Details';
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

    if(orders.length === 0){
        return(
            <div className={classes.load}>
                <img src = {loader} alt = "Loading..."></img>
            </div>
        );
    }

    const currOrder = orders.find(item => item.order_id === oid);

    if(!currOrder){
        return(
            <div className={classes.load}>
                <img src = {loader} alt = "Loading..."></img>
            </div>
        );
    }

    const [dd, mm, yyyy] = currOrder.date.split("/");
    const month = ["", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const productList = currOrder.products.map((shoe) => (
        <OrderProductCard 
            key = {shoe._id} 
            id = {shoe._id}
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

    return(
        <div className={classes.layout}>
            <div>
                <p><span className={classes.head}>Placed On:</span>&nbsp;&nbsp;{dd}&nbsp;{month[Number(mm)]}&nbsp;{yyyy}</p>
                <p><span className={classes.head}>Order No:</span>&nbsp;&nbsp;{oid}</p>
                <p><span className={classes.head}>Total Amount:</span>&nbsp;&#8377;&nbsp;{currOrder.bill[0].amount}</p>
            </div>
            <div>
                <p className={classes.head}>Contact Details</p>
                
                <p className={classes.mobNo}><span className={classes.phone}><PhoneIcon /></span>&nbsp;&nbsp;{currOrder.address.mob}</p>
            </div>
            <div>
                <p className={classes.head}>Shipping Address</p>
                <p className={classes.name}>{currOrder.address.name}</p>
                <p>{currOrder.address.house},&nbsp;&nbsp;{currOrder.address.town}</p>
                <p>{currOrder.address.city},&nbsp;&nbsp;{currOrder.address.state}&nbsp;-&nbsp;{currOrder.address.pin}</p>
            </div>
            <div>
                <p className={classes.head}>Payment Method</p>
                <p>{currOrder.payment}</p>
            </div>
            {productList}
        </div>
    );
}

export default OrderView;
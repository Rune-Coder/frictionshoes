import React, { useState } from 'react';
import TrashIcon from '../icons/trashIcon';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartStore';

import classes from './productItemCard.module.css';
import AlertCard from './alertCard';

function ProductItemCard(props){
    const dispatch = useDispatch();
    const userSub = useSelector((state) => state.login.userData);

    //post cart data mongodb
    async function postData(email, cart, bill){

        const res = await fetch("/api/user/history-create", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, cart, bill })
        });
    
        await res.json();

    }

    const [rem, setRem] = useState(false);
    function remHandler(event){
        if(rem === true)
            setRem(false);
        else
            setRem(true);
        return;
    }
    function remConfirm(con){
        if(rem === true)
            setRem(false);
        else
            setRem(true);
        if(con === 1)
            remItem();
        return;
    }

    function remItem(event){
        dispatch(cartActions.removeItem({
            id: props.id,
            sz: props.size,
        }));

        //store cart in mongodb
        const email = userSub.email;
        const cart = JSON.parse(localStorage.getItem("products"));
        const bill = JSON.parse(localStorage.getItem("billStore"));

        postData(email, cart, bill);
    }
    function qtyHandler(event){
        dispatch(cartActions.open({
            id: props.id,
            topic: "Quantity",
            sz: props.size,
            value: props.quantity,
        }));
    }
    function sizeHandler(event){
        dispatch(cartActions.open({
            id: props.id,
            topic: "Size",
            sz: props.size,
            value: props.size,
        }));
    }

    return (
        <div className={classes.card}>
            <div className={classes.image}><img src = {props.image} alt = "Shoe"></img></div>

            <div className={classes.details}>

                <ul className={classes.header}>

                    <li className={classes.company}>{props.company}</li>
                    <li><span className={classes.close} onClick={remHandler}><TrashIcon /></span></li>

                </ul>

                <p className={classes.product}>{props.product}</p>
                <p>{props.rating}</p>
                <p className={classes.sizeQty}><span onClick={sizeHandler}>Size: {props.size}</span>&nbsp;&nbsp;&nbsp;<span onClick={qtyHandler}>Qty: {props.quantity}</span></p>
                <p className={classes.price}>&#8377;{props.sp}&nbsp;&nbsp;
                    
                    <span className={classes.mrp}>&#8377;{props.mrp}</span>
                    <span className={classes.discount}>&nbsp;&nbsp;({props.discount}% off)</span>
                
                </p>

            </div>

            {rem && <div className= {classes.backdrop}/>}
            {rem && <div className={classes.alert}><AlertCard value = {1} confirm = {remConfirm} /></div>}
            
        </div>
    );
}

export default ProductItemCard;
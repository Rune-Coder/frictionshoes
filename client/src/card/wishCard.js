import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { wishActions } from '../store/wishStore';
import { cartActions } from '../store/cartStore';

import WishAlertCard from './wishAlertCard';
import CloseIcon from '../icons/closeIcon';
import classes from './wishCard.module.css';

function WishCard(props) {
    const userSub = useSelector((state) => state.login.userData);

    const [size, setSize] = useState(false);

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

    //post wish data mongodb
    async function postWishData(email, wish){

        const res = await fetch("/api/user/history-create", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, wish })
        });
    
        await res.json();

    }


    let navigate = useNavigate();
    function routeChange(){ 
        let path = `/shoes/`+props.company.toLowerCase()+'-'+props.product.toLowerCase()+'/'+props.id; 
        navigate(path);
    }

    const dispatch = useDispatch();
    function addItem(size){
        sizeHandler();
        if(size === "0")
            return;
        dispatch(cartActions.addItem({
            id: props.id,
            image: props.image,
            company: props.company,
            product: props.product,
            rating: props.rating,
            sp: props.sp,
            mrp: props.mrp,
            discount: props.discount,
            quantity: 1,
            sz: size,
            delfee: 0,
        }));

        //store cart in mongodb
        const email = userSub.email;
        const cart = JSON.parse(localStorage.getItem("products"));
        const bill = JSON.parse(localStorage.getItem("billStore"));

        postData(email, cart, bill);
    
        remItem();
        return;
    }

    function sizeHandler(event){
        if(size)
            setSize(false);
        else
            setSize(true);
    }

    function remItem(event){
        dispatch(wishActions.removeItem({
            id: props.id,
        }));

        //store wish in mongodb
        const email = userSub.email;
        const wish = JSON.parse(localStorage.getItem("wishStore"));

        postWishData(email, wish);
        
    }

    return(
        <div className={classes.card}>
            <div className={classes.image} onClick = {routeChange}>
                <img src = {props.image} alt = "Shoe"></img>
           </div>
           <div className={classes.desc}>
                <p className={classes.prdct}>{props.product}</p>
                <p className={classes.price}>&#8377;{props.sp}&nbsp;
                    <span className={classes.mrp}>&#8377;{props.mrp}</span>&nbsp;
                    <span className={classes.discount}>({props.discount}% off)</span>
                </p>
                <button type='button' className={classes.bag} onClick = {sizeHandler}>MOVE TO BAG</button>
                <span className={classes.close} onClick = {remItem}><CloseIcon /></span>
           </div>

           {size && <div className= {classes.backdrop}/>}
            {size && <div className={classes.wishAlert}><WishAlertCard confirmSize = {addItem} /></div>}

        </div>
    );
}

export default WishCard;
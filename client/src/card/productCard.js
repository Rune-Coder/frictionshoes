import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { wishActions } from '../store/wishStore';

import StarRating from './starRating';
import HeartIcon from '../icons/heartIcon';
import classes from './productCard.module.css';

function ProductCard(props) {
    const loginSub = useSelector((state) => state.login.loggedin);
    const userSub = useSelector((state) => state.login.userData);
    let navigate = useNavigate();

    function routeChange(){ 
        let path = `/shoes/`+props.company.toLowerCase()+'-'+props.product.toLowerCase()+'/'+props.id; 
        navigate(path);
    }

    const [addWish, setAddWish] = useState(false);

    useEffect(() => {

        const wish = localStorage.getItem("wishStore") ? JSON.parse(localStorage.getItem("wishStore")) : [];
        if(wish.length > 0){
            const existItem = wish.find(item => item.id === props.id);
            if(existItem)
                setAddWish(true);
        }
        
    }, [props]);

    const dispatch = useDispatch();

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

    function wishHandler(event){
        event.stopPropagation();

        //authenticate
        if(!loginSub){
            navigate(`/login`);
            return;
        }

        if(addWish)
            setAddWish(false);
        else
            setAddWish(true);

        dispatch(wishActions.addItem({
            id: props.id,
            image: props.image,
            company: props.company,
            product: props.product,
            rating: props.rating,
            sp: props.sp,
            mrp: props.mrp,
            discount: props.discount,
        }));

        //store wish in mongodb
        const email = userSub.email;
        const wish = JSON.parse(localStorage.getItem("wishStore"));

        postWishData(email, wish);

        return; 
    }
    return(
        <div className={classes.card} onClick = {routeChange}>
           <div className={classes.image}>
                <img src = {props.image} alt = "Shoe"></img>
           </div>
           <div className={classes.desc}>
                <span  className={classes.comName}>{props.company}</span>
                <p className={classes.pName}>{props.product}</p>
                <p className={classes.rating}>
                    <StarRating stars={props.rating}/>{props.rating}
                </p>
                <ul className={classes.priceCart}>
                    <li className={classes.price}>&#8377;{props.sp} <span className={classes.mrp}>
                        &#8377;{props.mrp}</span> <span className={classes.discount}>({props.discount}% off)</span>
                    </li>
                    <li onClick={wishHandler}><span className = {`${classes.wishList} ${addWish && classes.activeWish} ${!addWish && ''}`}><HeartIcon /></span></li>
                </ul>
           </div>
        </div>
    );
}

export default ProductCard;
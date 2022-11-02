import React from 'react';

import { useNavigate } from 'react-router-dom';

import wishImage from '../../image/wishList.png';
import classes from './wishListEmpty.module.css';

function WishListEmpty(props){
    let navigate = useNavigate(); 

    function toHome(){ 
        let path = `/home`; 
        navigate(path);
    }
    return(
        <div className={classes.emptyWish}>
            <img src = {wishImage} alt = "List" className={classes.wishImg}></img>
            <p>YOUR WISHLIST IS EMPTY</p>
            <p className={classes.subHead}>Add items that you like to your wishlist.</p>
            <button type='button' onClick={toHome}>CONTINUE SHOPPING</button>
        </div>
    );
}

export default WishListEmpty;
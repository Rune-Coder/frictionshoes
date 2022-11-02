import React from 'react';

import { useNavigate } from 'react-router-dom';

import bagImage from '../../image/bag.png';
import classes from './cartEmpty.module.css';

function CartEmpty(props){
    let navigate = useNavigate(); 

    function toHome(){ 
        let path = `/home`; 
        navigate(path);
    }
    return(
        <div className={classes.emptyBag}>
            <img src = {bagImage} alt = "Bag"  className={classes.cartImg}></img>
            <p>Your bag is empty</p>
            <p className={classes.subHead}>Let's add some items</p>
            <button type='button' onClick={toHome}>SHOP NOW</button>
        </div>
    );
}

export default CartEmpty;
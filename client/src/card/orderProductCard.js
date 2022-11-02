import React from 'react';

import classes from './orderProductCard.module.css';

function OrderProductCard(props){
    return (
        <div className={classes.layout}>
            <div className={classes.img}><img src = {props.image} alt = "Shoe"></img></div>
            <div className={classes.details}>
                <div>{props.company}</div>
                <div className={classes.subHead}>{props.product}</div>
                <div className={classes.subHead}>Size:&nbsp;{props.size}&nbsp;|&nbsp;Qty:&nbsp;{props.quantity}</div>
                <p>&#8377;&nbsp;{props.sp}</p>
            </div>
        </div>
    );
}

export default OrderProductCard;
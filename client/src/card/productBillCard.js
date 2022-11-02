import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './productBillCard.module.css';

function ProductBillCard(props){
     let navigate = useNavigate();
    function routeChange(){
          let path = `/address`; 
          navigate(path, {state:{
               itemQty : props.itemQty,
               tmrp : props.tmrp, 
               tdis : props.tdis,
               tdelfee: props.tdelfee,
               amount : props.amount
           }});
    }
    return(
        <div className={classes.cartBill}>
           <p>PRICE DETAILS({props.itemQty} items)</p>
           <ul>
                <li>Total MRP</li>
                <li>&#8377;{props.tmrp}</li>
           </ul>
           <ul>
                <li>Discount on MRP</li>
                <li>-&#8377;{props.tdis}</li>
           </ul>
           <ul>
                <li>Delivery Fee</li>
                <li>&#8377;{props.tdelfee}</li>
           </ul>
           <hr />
           <ul className={classes.total}>
                <li>Total Amount</li>
                <li>&#8377;{props.amount}</li>
           </ul>
           {props.value === "bill" && <button type='button' className={classes.proceed} onClick={routeChange}>PROCEED TO BUY</button>}
        </div>
    );
}

export default ProductBillCard;
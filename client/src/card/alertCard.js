import { Fragment, React, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/cartStore';

import CloseIcon from '../icons/closeIcon';
import classes from './alertCard.module.css';

function AlertCard(props){
    const dispatch = useDispatch();
    const alertItems = useSelector((state) => state.cart.alertDetails);
    const userSub = useSelector((state) => state.login.userData);

    const [value, setValue] = useState(alertItems[0].value.toString());

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

    function closeHandler(event){
        dispatch(cartActions.open({
            id: alertItems[0].id,
            topic: alertItems[0].topic,
            sz: alertItems[0].sz,
            value: alertItems[0].value,
        }));
    }
    function valueHandler(event){
        setValue(event.target.innerText);
        return;
    }
    function finalValue(event){
        dispatch(cartActions.done({
            id: alertItems[0].id,
            topic: alertItems[0].topic,
            sz: alertItems[0].sz,
            value: value,
        }));

        //store cart in mongodb
        const email = userSub.email;
        const cart = JSON.parse(localStorage.getItem("products"));
        const bill = JSON.parse(localStorage.getItem("billStore"));

        postData(email, cart, bill);
    }
    function closeRem(event){
        props.confirm(0);
    }
    function remItem(event){
        props.confirm(1);
    }

    return(
        <div className={classes.cardLayout}>
            {!props.value && <Fragment>
                <p className={classes.close}><span className={classes.closeIcon} onClick={closeHandler}><CloseIcon /></span></p>
                <p>Select {alertItems[0].topic}</p>
                <div className={classes.value}>
                    {alertItems[0].topic === "Quantity" && <button type = "button" className={value === "1" ? classes.active : ''} onClick={valueHandler}>1</button>}
                    {alertItems[0].topic === "Quantity" && <button type = "button" className={value === "2" ? classes.active : ''} onClick={valueHandler}>2</button>}
                    {alertItems[0].topic === "Quantity" && <button type = "button" className={value === "3" ? classes.active : ''} onClick={valueHandler}>3</button>}
                    {alertItems[0].topic === "Quantity" && <button type = "button" className={value === "4" ? classes.active : ''} onClick={valueHandler}>4</button>}
                    {alertItems[0].topic === "Quantity" && <button type = "button" className={value === "5" ? classes.active : ''} onClick={valueHandler}>5</button>}
                    <button type = "button" className={value === "6" ? classes.active : ''} onClick={valueHandler}>6</button>
                    <button type = "button" className={value === "7" ? classes.active : ''} onClick={valueHandler}>7</button>
                    <button type = "button" className={value === "8" ? classes.active : ''} onClick={valueHandler}>8</button>
                    <button type = "button" className={value === "9" ? classes.active : ''} onClick={valueHandler}>9</button>
                    <button type = "button" className={value === "10" ? classes.active : ''} onClick={valueHandler}>10</button>
                </div>
                <button type = "button" className={classes.done} onClick={finalValue}>DONE</button>
            </Fragment>}
            {props.value && <div>
                <p className={classes.close}><span className={classes.closeIcon} onClick={closeRem}><CloseIcon /></span></p>
                <p className={classes.head}>Remove from Bag</p>
                <p>Are you sure you want to remove this item from bag?</p>
                <p className={classes.msg}>You can save items to your wishlist to use this product later</p>
                <div className={classes.confirmBtn}>
                    <button type = "button" className={classes.rem} onClick={remItem}>REMOVE</button>
                    <button type = "button" className={classes.cancel} onClick={closeRem}>CANCEL</button>
                </div>
            </div>}
        </div>
    );
}

export default AlertCard;
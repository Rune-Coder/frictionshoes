import { Fragment, React, useState } from 'react';

import CloseIcon from '../icons/closeIcon';
import classes from './alertCard.module.css';

function WishAlertCard(props){
    const [value, setValue] = useState("0");

    function closeHandler(event){
        props.confirmSize("0");
    }
    function valueHandler(event){
        setValue(event.target.innerText);
        return;
    }
    function finalValue(event){
        if(value !== "0")
            props.confirmSize(value);
        else
            closeHandler();
    }

    return(
        <div className={classes.cardLayout}>
            {!props.value && <Fragment>
                <p className={classes.close}><span className={classes.closeIcon} onClick={closeHandler}><CloseIcon /></span></p>
                <p>Select Size</p>
                <div className={classes.value}>
                    <button type = "button" className={value === "6" ? classes.active : ''} onClick={valueHandler}>6</button>
                    <button type = "button" className={value === "7" ? classes.active : ''} onClick={valueHandler}>7</button>
                    <button type = "button" className={value === "8" ? classes.active : ''} onClick={valueHandler}>8</button>
                    <button type = "button" className={value === "9" ? classes.active : ''} onClick={valueHandler}>9</button>
                    <button type = "button" className={value === "10" ? classes.active : ''} onClick={valueHandler}>10</button>
                </div>
                <button type = "button" className={classes.done} onClick={finalValue}>DONE</button>
            </Fragment>}
        </div>
    );
}

export default WishAlertCard;
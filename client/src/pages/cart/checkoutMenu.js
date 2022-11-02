import React from 'react';
import classes from './checkoutMenu.module.css';

function CheckoutMenu(props){
    return(
        <div className={classes.menu}>
            <ul className={classes.menuList}>
                <li className={props.value === "bag" ? classes.active : ''}>B A G</li>
                <li><hr className={classes.line} /></li>
                <li className={props.value === "add" ? classes.active : ''}>A D D R E S S</li>
                <li><hr className={classes.line} /></li>
                <li className={props.value === "pay" ? classes.active : ''}>P A Y M E N T</li>
            </ul>
        </div>
    );
}

export default CheckoutMenu;
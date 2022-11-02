import React, { useEffect } from 'react';

import CheckoutMenu from '../cart/checkoutMenu';
import PaymentOptions from './paymentOptions';
import classes from './payment.module.css';


function Payment(props){

    useEffect(() => {
        document.title = 'PAYMENT';
        window.scrollTo(0, 0);
    });

    return(
        <div>
            <div>
                <CheckoutMenu value = "pay" />
            </div>
            <div className={classes.layout}>
                <PaymentOptions />
            </div>
        </div>
    );
}

export default Payment;
import React from 'react';
import VisaIcon from '../icons/visaIcon';
import RupeeIcon from '../icons/rupeeIcon';
import AmazonPayIcon from '../icons/amazonpayIcon';
import MastercardIcon from '../icons/mastercardIcon';
import classes from './footer.module.css';

function Footer(props) {
    return(
        <div className={classes.footr}>
            <div className={classes.footrNav}>
                <div>
                    <ul className={classes.list}><span className={classes.listHead}>ONLINE SHOPPING</span>
                        <li>Men</li>
                        <li>Women</li>
                        <li>Kids</li>
                    </ul>
                </div>
                <div>
                    <ul className={classes.list}><span className={classes.listHead}>CUSTOMER POLICIES</span>
                        <li>Blog</li>
                        <li>Contact Us</li>
                        <li>FAQ</li>
                        <li>Terms & Conditions</li>
                        <li>Terms of Use</li>
                        <li>Track Orders</li>
                        <li>Cancellation</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <ul className={classes.list}><span className={classes.listHead}>CONNECT WITH US</span>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Youtube</li>
                        <li>LinkedIn</li>
                        <li>Twitter</li>
                        <li>Pinterest</li>
                    </ul>
                </div>
            </div>
            <hr className={classes.line} />
            <div className={classes.payments}>
                <p>Payment Methods</p>
                <ul>
                    <li>Net<span className={classes.bank}>Banking</span></li>
                    <li><span className={classes.payIcons}><VisaIcon /></span></li>
                    <li><span className={classes.payIcons}><MastercardIcon /></span></li>
                    <li><span className={classes.payIcons}><RupeeIcon /></span>CASH ON DELIVERY</li>
                    <li><span className={classes.payIcons}><AmazonPayIcon /></span></li>
                </ul>
                <p className={classes.copyright}>Copyright © 2022 Souhardya Dutta. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
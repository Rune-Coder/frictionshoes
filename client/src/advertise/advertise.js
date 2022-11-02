import React from 'react';
import BadgeCheckIcon from '../icons/badgeCheckIcon';
import HandLoveIcon from '../icons/handLoveIcon';
import TruckIcon from '../icons/truckIcon';
import GooglePlayIcon from '../icons/googlePlayIcon';
import AppleIcon from '../icons/appleIcon';
import classes from './advertise.module.css';

function Advertise(props) {
    return(
        <div className={classes.advertise}>
            <div className={classes.characteristics}>
                <div className={classes.singleCharacteristic}><span className={classes.services}><TruckIcon /></span>Super Fast Delivery&nbsp;&nbsp;</div>
                <div><span className={classes.services}><HandLoveIcon /></span>100% Handpicked&nbsp;&nbsp;</div>
                <div><span className={classes.services}><BadgeCheckIcon /></span>Assured Quality&nbsp;&nbsp;</div>
            </div>
            <div className={classes.app}>
                <p>Experience the shoe mobile app</p>
                <button className={classes.appBtn}>
                    <span className={classes.play}>
                        <GooglePlayIcon />
                    </span>Get it on Google Play
                </button>
                <button className={classes.appBtn}>
                    <span className={classes.play}>
                        <AppleIcon />
                    </span>Download on the App Store
                </button>
            </div>
        </div>
    );
}

export default Advertise;
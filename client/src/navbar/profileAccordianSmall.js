import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../store/loginStore';

import ProfileIcon from '../icons/profileIcon';
import classes from './profileAccordianSmall.module.css';
import AngleRight from '../icons/angleRight';
import AngleDown from '../icons/angleDown';

function ProfileAccordianSmall(props) {

    const loginSub = useSelector((state) => state.login.loggedin);
    const userSub = useSelector((state) => state.login.userData);
    const [showAccordian, setShowAccordian] = useState(false);

    let navigate = useNavigate(); 
    const dispatch = useDispatch();

    function toLogin(){ 
        props.close(true);
        let path = `/login`; 
        navigate(path);
    }

    function toLogout(){ 
        dispatch(loginActions.logout({}));
        window.location.reload();
    }

    function toProfile(){ 
        props.close(true);
        let path = `/profile`; 
        navigate(path);
    }

    function toOrders(){ 
        props.close(true);
        let path = `/orders`; 
        navigate(path);
    }

    function showAcc(event){
        if(showAccordian === true)
            setShowAccordian(false);
        else
            setShowAccordian(true);
        return;
    }

    return(
        <ul className={classes.profileList} onClick = {showAcc}>
            {!loginSub && <li className={classes.head}>
                <div className={classes.profileHeader}>
                    <span className={classes.profileIcon}><ProfileIcon /></span>&nbsp;&nbsp;
                    Hello&nbsp;User
                </div>
                {!showAccordian && <span className={classes.angle}><AngleRight /></span>}
                {showAccordian && <span className={classes.angle}><AngleDown /></span>}
            </li>}
            {loginSub && <li className={classes.head}>
                <div className={classes.profileHeader}>
                    <span className={classes.profileIcon}><ProfileIcon /></span>&nbsp;&nbsp;
                    Hello&nbsp;{userSub.name.split(" ")[0]}
                </div>
                {!showAccordian && <span className={classes.angle}><AngleRight /></span>}
                {showAccordian && <span className={classes.angle}><AngleDown /></span>}
            </li>}

            {showAccordian && <ul className={classes.profileAccordian}>

                {!loginSub && <p className={classes.subHead}>Sign up to access your Friction account</p>}
                {!loginSub && <li onClick={toLogin}>Sign&nbsp;Up</li>}
                {loginSub && <li onClick={toProfile}>My&nbsp;Profile</li>}

                <li onClick={toOrders}>My&nbsp;Orders</li>
                {loginSub && <li onClick={toLogout}>Log&nbsp;Out</li>}

            </ul>}
           
        </ul>
    );
}

export default ProfileAccordianSmall;
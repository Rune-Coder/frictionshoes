import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../store/loginStore';

import classes from './profileAccordian.module.css';

function ProfileAccordian(props) {

    const loginSub = useSelector((state) => state.login.loggedin);
    const userSub = useSelector((state) => state.login.userData);

    let navigate = useNavigate(); 
    const dispatch = useDispatch();

    function toLogin(){ 
        let path = `/login`; 
        navigate(path);
    }

    function toLogout(){ 
        dispatch(loginActions.logout({}));
        window.location.reload();
    }

    function toProfile(){ 
        let path = `/profile`; 
        navigate(path);
    }

    function toOrders(){ 
        let path = `/orders`; 
        navigate(path);
    }

    return(
        <ul className={classes.profileList}>
            {!loginSub && <p className={classes.head}>Hello User</p>}
            {loginSub && <p className={classes.head}>Hello {userSub.name.split(" ")[0]}</p>}

            {!loginSub && <p className={classes.subHead}>Sign up to access your Friction account</p>}

            {!loginSub && <li onClick={toLogin}>Sign Up</li>}
            
            {loginSub && <li onClick={toProfile}>My Profile</li>}

            <li onClick={toOrders}>My Orders</li>
            {loginSub && <li onClick={toLogout}>Log Out</li>}
        </ul>
    );
}

export default ProfileAccordian;
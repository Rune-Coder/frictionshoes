import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../store/loginStore';

import NotificationCard from '../../card/notificationCard';
import preloader from '../../image/sectionLoader.gif';
import classes from './signIn.module.css';

function SignIn(props){
    let navigate = useNavigate();

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [errMsg, setErrMsg] = useState({ emailVerify: "ok", verifyCredentials: "ok" });
    const [loggedin, setLoggedin] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        document.title = 'Online Shopping site for shoes in India | Friction';
        window.scrollTo(0, 0);
    });

    function emailHandler(event){
        setEmail(event.target.value);    
    }

    function passwordHandler(event){
        setPassword(event.target.value);    
    }

    const dispatch = useDispatch();

    async function loginHandler(event){
        event.preventDefault();
        setLoader(true);
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat) === false){
            setErrMsg({ ...errMsg, emailVerify: "ok"});
            return;
        }
        setErrMsg({ ...errMsg, emailVerify: "ok"});

        const res = await fetch("/api/user/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        setLoader(false);

        if(!res.ok || !data){
            setErrMsg({ ...errMsg, verifyCredentials: "Incorrect Email or Password"});
        }
        else{
            
            dispatch(loginActions.login({
                _id: data._id,
                name: data.name,
                mobile: data.mobile,
                email: data.email,
                gender: data.gender,
                isAdmin: data.isAdmin,
                token: data.token
            }));

            setErrMsg({ ...errMsg, verifyCredentials: "ok"});
            setLoggedin(true);
            setTimeout(function(){ setLoggedin(false);
                window.location.reload(true);}, 3000);
            setTimeout(function(){ 
                navigate(`/`, { replace: true });
            }, 4000);
        }
        
    }

    return(
        <div className={classes.login}>
            <form method='POST' className={classes.loginForm} onSubmit = {loginHandler}>
                <p className={classes.head}><span  className={classes.headSpan}>Login</span> or <span  className={classes.headSpan}>Signup</span></p>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' ' 
                        required 
                        className={classes.textBox}
                        onBlur = {emailHandler}>
                    </input>
                    <label className={classes.formLabel}>
                       Email*
                    </label>
                    {errMsg.emailVerify !== "ok" && <p className={classes.errmsg}>{errMsg.emailVerify}</p>}
                </div>
                <div className={classes.details}>
                    <input 
                        type= "password" 
                        placeholder=' ' 
                        maxlength="16"
                        required 
                        className={classes.textBox}
                        onBlur = {passwordHandler}>
                    </input>
                    <label className={classes.formLabel}>
                       Password*
                    </label>
                </div>

                {errMsg.verifyCredentials !== "ok" && <p className={classes.errmsg}>{errMsg.verifyCredentials}</p>}
                <p className={classes.failLogIn} onClick = {() => navigate(`/set-password`)}>Forgot Password?</p>
                <button type = "submit" value="Submit" className={classes.contd}>CONTINUE</button>
                <p className={classes.agree}> By continuing, I agree to the <span className={classes.bond}>Terms of Use</span> and&nbsp;
                <span className={classes.bond}>Privacy Policy</span></p>
                <p className={classes.failLogIn} onClick = {() => navigate(`/register`)}>New to Friction? Create an account</p>
            </form>
            {loggedin && <NotificationCard value = {"Logged in Successfully"} />}
            {loader && <img src = {preloader} className={classes.load} alt = "Loading..."></img>}
        </div>
    );
}

export default SignIn;
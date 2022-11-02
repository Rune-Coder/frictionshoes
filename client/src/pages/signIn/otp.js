import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import NotificationCard from '../../card/notificationCard';
import preloader from '../../image/sectionLoader.gif';
import ToastCard from '../../card/toastCard';
import classes from './otp.module.css';

function Otp(props){

    useEffect(() => {
        document.title = 'Online Shopping site for shoes in India | Friction';
        window.scrollTo(0, 0);
    });

    const location = useLocation();

    let navigate = useNavigate();


    const [sec, setSec] = useState(60);
    const [otpLen, setOtpLen] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [otp, setOtp] = useState(0);
    const [updated, setUpdated] = useState(false);
    const [loader, setLoader] = useState(false);


    useEffect(() =>{
        if(otp === 0)
            getOtpEmail(location.state.email);
    }, [otp, location.state.email]);


    if(!location.state){
        return(
            <img src = {preloader} className={classes.load} alt = "Loading..."></img>
        );
    }

    function autoFocus(seq, final){
        const initial = document.getElementById(seq);
        if(initial.value.length)
            document.getElementById(final).focus();
        return;
    }

    async function getOtpEmail(email){
        const res = await fetch("/api/user/send-otp", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
    
        const data = await res.json();
            
        if(res.ok && data)
            setOtp(data);
    }

    function otpResend(event){
        setSec(60);
        setOtp(0);
        if(otp === 0)
            getOtpEmail(location.state.email);
        return;
    }

    async function  changePassword(email, password){

        setLoader(true);

        const res = await fetch("/api/user/update-password", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        await res.json();

        setLoader(false);
        if(res.ok){
            setUpdated(true);
            setTimeout(function(){ setUpdated(false);}, 3000);
            setTimeout(function(){ navigate(`/`);}, 3500);
        }
    }

    function getOtp(){
        const finalOtp = document.getElementById("first").value+
        document.getElementById("sec").value+
        document.getElementById("third").value+
        document.getElementById("fourth").value+
        document.getElementById("fifth").value+
        document.getElementById("sixth").value;

        if(Number(finalOtp) === otp){
            
            changePassword(location.state.email, location.state.password);
            return;
        }
        else{
            setShowToast(true);
            setTimeout(function(){ setShowToast(false); }, 3000);
            return;
        }
    }

    function otpHandler(event){
        const no = event.target.value;

        if(no === "" && otpLen !== 0)
            setOtpLen(otpLen-1);
        else{
            if(otpLen === 5)
                getOtp();
            setOtpLen(otpLen+1);
        }

        return;
    }

    function timer(){
        setSec(sec-1);
        return;
    }
    function remToast(rem){
        setShowToast(false);
        return;
    } 

    if(sec > 0)
        setTimeout(timer, 1000);

    return(
        <div className={classes.layout}>
        <div>
            {showToast && <div className={classes.toast}> <ToastCard close = {remToast} value = "Incorrect OTP" /> </div>}
            <form>
                <p className={classes.head}>Verify with OTP</p>
                <p className={classes.subHead}>Sent to {location.state.email}</p>
                <div className={classes.otpDetails}>
                    <input 
                        type= "text" 
                        maxLength= "1"
                        required 
                        id= {"first"}
                        className={classes.textBox}
                        onKeyUp={() => autoFocus("first", 'sec')}
                        onChange = {otpHandler}
                        >
                    </input>
                    <input 
                        type= "text" 
                        maxLength= "1"
                        required 
                        id= {"sec"}
                        className={classes.textBox}
                        onKeyUp={() => autoFocus("sec", 'third')}
                        onChange = {otpHandler}
                        >
                    </input>
                    <input 
                        type= "text" 
                        maxLength= "1"
                        required 
                        id= {"third"}
                        className={classes.textBox}
                        onKeyUp={() => autoFocus("third", 'fourth')}
                        onChange = {otpHandler}
                        >
                    </input>
                    <input 
                        type= "text" 
                        maxLength= "1"
                        required 
                        id= {"fourth"}
                        className={classes.textBox}
                        onKeyUp={() => autoFocus("fourth", 'fifth')}
                        onChange = {otpHandler}
                        >
                    </input>
                    <input 
                        type= "text" 
                        maxLength= "1"
                        required 
                        id= {"fifth"}
                        className={classes.textBox}
                        onKeyUp={() => autoFocus("fifth", 'sixth')}
                        onChange = {otpHandler}
                        >
                    </input>
                    <input 
                        type= "text" 
                        maxLength= "1"
                        required 
                        id= {"sixth"}
                        className={classes.textBox}
                        onChange = {otpHandler}
                        >
                    </input>
                </div>
                {sec > 0 && <p className={classes.resendTimer}>Resend OTP in 00:{("0" + sec).slice(-2)}</p>}
                {!sec && <p className={classes.resend} onClick = {otpResend}>RESEND OTP</p>}
            </form>
            {updated && <NotificationCard value = {"Password Updated Successfully"} />}
            {loader && <img src = {preloader} className={classes.load} alt = "Loading..."></img>}
        </div>
        </div>
    );
}

export default Otp;
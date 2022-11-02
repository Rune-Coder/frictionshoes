import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import NotificationCard from '../../card/notificationCard';
import preloader from '../../image/sectionLoader.gif';
import classes from './registerForm.module.css';

function RegisterForm(props){

    const msg = {passWord: "ok", email: "ok", mob: "ok", gen: "ok", accCreated: "ok"};

    const [showPw, setShowPw] = useState("Show");
    const [useName, setUseName] = useState(" ");
    const [usePw, setUsePw] = useState(" ");
    const [useEmail, setUseEmail] = useState(" ");
    const [usePh, setUsePh] = useState(" ");
    const [useGen, setUseGen] = useState(" ");
    const [errMsg, setErrMsg] = useState(msg);
    const [registered, setRegistered] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        document.title = 'Create Account';
        window.scrollTo(0, 0);
    });

    function nameHandler(event){
        setUseName(event.target.value);
    }

    function showPass(event){
        const pasShow = document.getElementById("password");
        if(showPw === "Show"){
            setShowPw("Hide");
            pasShow.type = "text";
        }
        else{
            setShowPw("Show");
            pasShow.type = "password";
        }
    }

    function passwordHandler(event){
        const pw = event.target.value;
        setUsePw(pw);

        if(pw.length < 8)
            setErrMsg({ ...errMsg, passWord: "Minimum length must be 8"});
        else if(/[A-Z]/.test(pw) === false)
            setErrMsg({ ...errMsg, passWord: "Password must have atleast 1 uppercase character"});
        else if(/\d/.test(pw) === false)
            setErrMsg({ ...errMsg, passWord: "Password must have atleast 1 numeric character"});
        else if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pw) === false)
            setErrMsg({ ...errMsg, passWord: "Password must have atleast 1 special character"});
        else
            setErrMsg({ ...errMsg, passWord: "ok"});
    }

    function emailHandler(event){
        const eml = event.target.value;
        if(eml.length === 0)
            return;
        setUseEmail(eml);

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(eml.match(mailformat))
            setErrMsg({ ...errMsg, email: "ok"}); 
        else
            setErrMsg({ ...errMsg, email: "Enter a valid email"});
    }

    function mobHandler(event){
        const ph = event.target.value;
        setUsePh(ph);
        if(ph.length < 10)
            setErrMsg({ ...errMsg, mob: "Minimum length is 10"});
        else if((/^\d+$/.test(ph) === false) || (ph.charAt(0) < 6))
            setErrMsg({ ...errMsg, mob: "Please enter a valid 10 digit mobile number"});
        else
            setErrMsg({ ...errMsg, mob: "ok"});
    }

    function genHandler(event){
        var gen;
        if (document.getElementById('gen1').checked) {
            gen = document.getElementById('gen1').value;
            setUseGen(gen);
            setErrMsg({ ...errMsg, gen: "ok"});
        }
        else if (document.getElementById('gen2').checked) {
            gen = document.getElementById('gen2').value;
            setUseGen(gen);
            setErrMsg({ ...errMsg, gen: "ok"});
        }
        else{
            setErrMsg({ ...errMsg, gen: "Please select your gender"});
        }
    }

    let navigate = useNavigate();

    async function accSave(event){  
        event.preventDefault();
        setLoader(true);
        const res = await fetch("/api/user/register", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: useName,
                mobile: usePh,
                email: useEmail,
                password: usePw,
                gender: useGen
            })
        });

        const data = await res.json();
        setLoader(false);
        
        if(!res.ok || !data){
            setErrMsg({ ...errMsg, accCreated: "You are already registered!!"});
        }
        else{
            setErrMsg({ ...errMsg, accCreated: "ok"});
            setRegistered(true);
            setTimeout(function(){ setRegistered(false);}, 3000);
            setTimeout(function(){ navigate(`/login`);}, 4000);
        }
    }

    return(
        <form method='POST' onSubmit={accSave}>

            <div className={classes.details}>
                <input 
                    type= "password" 
                    placeholder=' '
                    maxlength="16"  
                    id= "password"
                    required 
                    className={classes.textBox}
                    onBlur = {passwordHandler}>
                </input>
                <span className={classes.show} onClick={showPass}>
                    {showPw}
                </span>
                <label className={classes.formLabel}>
                    Create Password*
                </label>
                {errMsg.passWord !== "ok" && <p className={classes.errmsg}>{errMsg.passWord}</p>}
            </div>

            <div className={classes.details}>
                <input 
                    type= "text" 
                    placeholder=' '  
                    required 
                    className={classes.textBox}
                    onBlur = {nameHandler}>
                </input>
                <label className={classes.formLabel}>
                    Full Name*
                </label>
            </div>

            <div className={classes.details}>
                <input 
                    type= "text" 
                    placeholder=' '  
                    className={classes.textBox}
                    required
                    onBlur = {emailHandler}>
                </input>
                <label className={classes.formLabel}>
                    Email*
                </label>
                {errMsg.email !== "ok" && <p className={classes.errmsg}>{errMsg.email}</p>}
            </div>

            <div className={classes.details}>
                <input 
                    type= "text" 
                    placeholder=' ' 
                    maxlength="10"  
                    className={classes.textBox}
                    required
                    onBlur = {mobHandler}>
                </input>
                <label className={classes.formLabel}>
                    Mobile Number*
                </label>
                {errMsg.mob !== "ok" && <p className={classes.errmsg}>{errMsg.mob}</p>}
            </div>

            <div className={classes.gen} onClick = {genHandler}>
                <p>Select Gender:&nbsp;</p>
                <input type="radio" id= "gen1" name="gender" value="Female" required>
                </input>
                <label for="gen1">Female</label>
                <input type="radio" id= "gen2" name="gender" value="Male" required>
                </input>
                <label for="gen2">Male</label>
            </div>
            {errMsg.gen !== "ok" && <p className={classes.errmsg}>{errMsg.gen}</p>}

            <button type= "submit" value="Submit" className={classes.save}>CREATE ACCOUNT</button>

            {errMsg.accCreated !== "ok" && <p className={classes.errmsg}>{errMsg.accCreated}</p>}
            {registered && <NotificationCard value = {"Account Created Successfully"} />}
            {loader && <img src = {preloader} className={classes.load} alt = "Loading..."></img>}
        </form>
    );
}

export default RegisterForm;
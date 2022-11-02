import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import classes from './passwordNew.module.css';

function PasswordNew(props){

    useEffect(() => {
        document.title = 'Change Password';
        window.scrollTo(0, 0);
    });

    const [useEmail, setUseEmail] = useState(" ");
    const [useNewPassword, setUseNewPassword] = useState(" ");
    const [useConfirmPassword, setUseConfirmPassword] = useState(" ");
    const [errMsg, setErrMsg] = useState({ pw: "ok", cpw: "ok" });

    let navigate = useNavigate();

    async function profileHandler(event){
        event.preventDefault();
        if(useEmail.trim() === "" || useNewPassword.trim() === "" || useConfirmPassword.trim() === "")
            return;

        if(errMsg.pw !== "ok" || errMsg.cpw !== "ok")
            return;
 
        navigate('/otp', {state: { email: useEmail, password: useNewPassword } });
        
    }
    function emailHandler(event){
        setUseEmail(event.target.value);
    }
    function newPasswordHandler(event){
        const pw = event.target.value;
        setUseNewPassword(pw);

        if(pw.length < 8)
            setErrMsg({ ...errMsg, pw: "Minimum length must be 8"});
        else if(/[A-Z]/.test(pw) === false)
            setErrMsg({ ...errMsg, pw: "Password must have atleast 1 uppercase character"});
        else if(/\d/.test(pw) === false)
            setErrMsg({ ...errMsg, pw: "Password must have atleast 1 numeric character"});
        else if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pw) === false)
            setErrMsg({ ...errMsg, pw: "Password must have atleast 1 special character"});
        else
            setErrMsg({ ...errMsg, pw: "ok"});
    }
    function confirmPasswordHandler(event){
        const cpw = event.target.value;
        setUseConfirmPassword(cpw);

        if(cpw !== useNewPassword)
            setErrMsg({ ...errMsg, cpw: "This field must be same as your password"});
        else
            setErrMsg({ ...errMsg, cpw: "ok"});
    }

    return (
        <div className={classes.layout}>
            <p>Set New Password</p>
            <form className={classes.loginForm} onSubmit = {profileHandler}>
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
                </div>
                <div className={classes.details}>
                    <input 
                        type= "password" 
                        placeholder=' '
                        maxlength="16"   
                        required 
                        className={classes.textBox}
                        onBlur = {newPasswordHandler}>
                    </input>
                    <label className={classes.formLabel}>
                       New Password*
                    </label>
                    {errMsg.pw !== "ok" && <p className={classes.errmsg}>{errMsg.pw}</p>}
                </div>
                <div className={classes.details}>
                    <input 
                        type= "password" 
                        placeholder=' ' 
                        maxlength="16"  
                        required 
                        className={classes.textBox}
                        onBlur = {confirmPasswordHandler}>
                    </input>
                    <label className={classes.formLabel}>
                       Confirm Password*
                    </label>
                    {errMsg.cpw !== "ok" && <p className={classes.errmsg}>{errMsg.cpw}</p>}
                </div>

                <button type= "submit" value="Submit" className={classes.save}>CONTINUE</button>

            </form>
        </div>
    );
}

export default PasswordNew;
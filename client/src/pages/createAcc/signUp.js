import React from "react";

import RegisterForm from "./registerForm";
import classes from "./signUp.module.css";

function SignUp(props) {
  return (
    <div className={classes.bg}>
        <div className={classes.createAcc}>
            <p className={classes.head}>Complete your sign up</p>
            <RegisterForm />
            <p className={classes.agree}> By signing up, I agree to the&nbsp; 
            <span className={classes.bond}>Terms and Conditions</span></p>
        </div>
    </div>
  );
}

export default SignUp;

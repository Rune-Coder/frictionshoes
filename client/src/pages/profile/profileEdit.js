import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { GetCookie } from '../../hooks/cookies';
import NotificationCard from '../../card/notificationCard';
import preloader from '../../image/sectionLoader.gif';
import classes from './profileEdit.module.css';

function ProfileEdit(props){

    const [useName, setUseName] = useState(" ");
    const [useGen, setUseGen] = useState(" ");
    const [user, setUser] = useState({});
    const [updated, setUpdated] = useState(false);
    const [loader, setLoader] = useState(false);

    let navigate = useNavigate();

    const token = GetCookie("token");

    useEffect(() =>{
        
        async function getData(){

            const res = await fetch(`/api/user/profile`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        
            const data = await res.json();
            
            if(res.ok)
                setUser(data);
            else
                navigate(`/login`, { replace: true });  
    
        }

        getData();
    }, [token]);

    async function profileHandler(event){
        event.preventDefault();
        if(useName.trim() === "" || useGen.trim() === "")
            return;

        setLoader(true);

        if(user === {})
            return;

        const email = user.email;

        const res = await fetch("/api/user/update-profile", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, name: useName, gender: useGen  })
        });
    
        await res.json();

        setLoader(false);
            
        if(res.ok){
            setUpdated(true);
            setTimeout(function(){ setUpdated(false);}, 3000);
            setTimeout(function(){ navigate(`/`);}, 3500);
        }
        else
            navigate(`/login`, { replace: true });  
        return;
    }
    function nameHandler(event){
        setUseName(event.target.value);
    }
    function genHandler(event){
        var gen;
        if (document.getElementById('gen1').checked) {
            gen = document.getElementById('gen1').value;
            setUseGen(gen);
        }
        else if (document.getElementById('gen2').checked) {
            gen = document.getElementById('gen2').value;
            setUseGen(gen);
        }
    }

    return (
        <div className={classes.layout}>
            <form className={classes.loginForm} onSubmit = {profileHandler}>
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
                <div className={classes.gen} onClick = {genHandler}>
                    <p>Select Gender:&nbsp;</p>
                    <input type="radio" id= "gen1" name="gender" value="Female" required>
                    </input>
                    <label for="gen1">Female</label>
                    <input type="radio" id= "gen2" name="gender" value="Male" required>
                    </input>
                    <label for="gen2">Male</label>
                </div>

                <button type= "submit" value="Submit" className={classes.save}>SAVE</button>

            </form>
            {updated && <NotificationCard value = {"Profile Updated Successfully"} />}
            {loader && <img src = {preloader} className={classes.load} alt = "Loading..."></img>}
        </div>
    );
}

export default ProfileEdit;
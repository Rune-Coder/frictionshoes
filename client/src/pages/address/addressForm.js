import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addressActions } from '../../store/addressStore';
import classes from './addressForm.module.css';

function AddressForm(props){

    const userSub = useSelector((state) => state.login.userData);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const msg = {mobNo: "ok", pinCode: "ok"};

    const [name, setName] = useState(" ");
    const [mob, setMob] = useState(" ");
    const [pin, setPin] = useState(" ");
    const [house, setHouse] = useState(" ");
    const [town, setTown] = useState(" ");
    const [landmark, setLandmark] = useState(" ");
    const [city, setCity] = useState(" ");
    const [state, setState] = useState(" ");
    const [errMsg, setErrMsg] = useState(msg);
    const [addr, setAddr] = useState([]);

    useEffect(() =>{

        //get address data mongodb
        async function getAddress(email){

            const res = await fetch("/api/user/history-get", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
        
            const data = await res.json();
                
            if(res.ok && data.address)
                setAddr(data.address);

        }
        getAddress(userSub.email);

    }, [userSub.email]);

    //post address
    async function postAddress(email, address){

        const res = await fetch("/api/user/history-create", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, address })
        });
    
        await res.json();

    }

    function toPayment(){
        navigate(`/payment`, { replace: true });
    }

    function addressSave(event){  
        event.preventDefault();

        if(errMsg.mobNo !== "ok" || errMsg.pinCode !== "ok")
            return;

        let newAddress = addr.slice();

        const id = "a"+newAddress.length;
        newAddress.push({
            _id: id,
            name : name,
            mobile : mob,
            house : house ,
            town : town,
            landmark: landmark,
            city : city,
            state : state,
            pin : pin
        });

        postAddress(userSub.email, newAddress);

        dispatch(addressActions.addAddress({
            name : name,
            mobile : mob,
            house : house ,
            town : town,
            landmark: landmark,
            city : city,
            state : state,
            pin : pin
        }));

        toPayment();

        
    }

    function nameHandler(event){
        setName(event.target.value);
    }
    function mobHandler(event){
        const contact = event.target.value;
        if(contact === ""){
            setErrMsg({ ...errMsg, mobNo: "This is a mandatory field"});
            return;
        }

        setMob(contact);  
        
        if(contact.length < 10)
            setErrMsg({ ...errMsg, mobNo: "Minimum length is 10"});
        else if(/^\d+$/.test(contact) === false || contact.charAt(0) < 6)
            setErrMsg({ ...errMsg, mobNo: "Please enter a valid 10 digit mobile number"});
        else
            setErrMsg({ ...errMsg, mobNo: "ok"});
    }
    async function pinHandler(event){
        const code = event.target.value;
        if(code === ""){
            setErrMsg({ ...errMsg, pinCode: "This is a mandatory field"});
            return;
        }
            
        setPin(code); 

        let data;

        try{
            const res = await fetch(`/api/user/getPinData/${code}`, {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });
            data = await res.json();
            
        }
        catch(error){
            console.log(error);
            return;
        }

        if(data.Status === "Error" || data.PostOffice === null){
            setErrMsg({ ...errMsg, pinCode: "Invalid pincode"});
            return;
        }
        
        setErrMsg({ ...errMsg, pinCode: "ok"});

        setCity(data.PostOffice[0].Taluk);
        setState(data.PostOffice[0].State);

        
    }
    function houseHandler(event){
        setHouse(event.target.value);
    }
    function townHandler(event){
        setTown(event.target.value);
    }
    function landmarkHandler(event){
        setLandmark(event.target.value);
    }


    return(
        <form onSubmit={addressSave}>
            <div className={classes.con}>
                <p className={classes.head}>CONTACT DETAILS</p>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' ' 
                        required 
                        className={classes.textBox}
                        onBlur = {nameHandler}>
                    </input>
                    <label className={classes.formLabel}>
                        Name*
                    </label>
                </div>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' ' 
                        maxlength="10" 
                        required 
                        className={classes.textBox}
                        onBlur = {mobHandler}>
                    </input>
                    <label className={classes.formLabel}>
                        Mobile No*
                    </label>
                    {errMsg.mobNo !== "ok" && <p className={classes.errmsg}>{errMsg.mobNo}</p>}
                </div>
            </div>
            <div className={classes.add}>
                <p className={classes.head}>ADDRESS</p>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' ' 
                        maxlength="6" 
                        required 
                        className={classes.textBox}
                        onBlur = {pinHandler}>
                    </input>
                    <label className={classes.formLabel}>
                        Pin Code*
                    </label>
                    {errMsg.pinCode !== "ok" && <p className={classes.errmsg}>{errMsg.pinCode}</p>}
                </div>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' '  
                        required 
                        className={classes.textBox}
                        onBlur = {houseHandler}>
                    </input>
                    <label className={classes.formLabel}>
                        Address(House No, Building, Street, Area)*
                    </label>
                </div>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' '  
                        required 
                        className={classes.textBox}
                        onBlur = {townHandler}>
                    </input>
                    <label className={classes.formLabel}>
                        Locality/Town*
                    </label>
                </div>
                <div className={classes.details}>
                    <input 
                        type= "text" 
                        placeholder=' '  
                        className={classes.textBox}
                        onBlur = {landmarkHandler}>
                    </input>
                    <label className={classes.formLabel}>
                        Landmark (optional)
                    </label>
                </div>
                <div className={classes.details}>
                    {city === " " && <div className={classes.fixed}>City/District*</div>}
                    {city !== " " && <div className={classes.fixed}>{city}</div>}
                </div>
                <div className={classes.details}>
                    {state === " " && <div className={classes.fixed}>State*</div>}
                    {state !== " " && <div className={classes.fixed}>{state}</div>}
                </div>
            </div>
            <button type= "submit" value="Submit" className={classes.save}>ADD ADDRESS</button>
        </form>
    );
}

export default AddressForm;
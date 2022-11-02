import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CheckoutMenu from '../cart/checkoutMenu';
import ProductBillCard from '../../card/productBillCard';
import AddressForm from './addressForm';
import classes from './address.module.css';
import AddressSavedCard from '../../card/addressSavedCard';

function Address(props){

    const userSub = useSelector((state) => state.login.userData);
    let navigate = useNavigate();
    const [address, setAddress] = useState([]);

    useEffect(() => {
        document.title = 'ADDRESS';
        window.scrollTo(0, 0);
    });

    var bill;
    if(localStorage.getItem("billStore")){
        bill = JSON.parse(localStorage.getItem("billStore"));
        if(bill.tmrp === 0)
            navigate(`/`, { replace: true });
    }
    else{
        navigate(`/`, { replace: true });
    }


    useEffect(() =>{

        //post cart data mongodb
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
                setAddress(data.address);

        }
        getAddress(userSub.email);

    }, [userSub.email]);

    const addressList = address.map((add) => (
        <AddressSavedCard 
            key = {add._id} 
            name = {add.name}
            mobile = {add.mobile}
            house = {add.house} 
            town = {add.town} 
            landmark = {add.landmark} 
            city = {add.city} 
            state = {add.state} 
            pin = {add.pin} 
        />
    ));

    return(
        <div>
            <div>
                <CheckoutMenu value = "add" />
            </div>
            <div className={classes.address}>
                <div className={classes.savedAdd}>{addressList}</div>
                <div className={classes.form}>
                    <AddressForm />
                </div>
                <ProductBillCard 
                    tmrp = {bill[0].tmrp} 
                    tdis = {bill[0].tdis} 
                    tdelfee = {bill[0].tdelfee} 
                    amount = {bill[0].amount} 
                    itemQty = {bill[0].len}
                    value = {"info"}
                />
            </div>
        </div>
    );
}

export default Address;
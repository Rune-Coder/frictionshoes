import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addressActions } from '../store/addressStore';
import classes from './addressSavedCard.module.css';

function AddressSavedCard(props){

    const dispatch = useDispatch();
    let navigate = useNavigate();

    function toPayment(){
        navigate(`/payment`, { replace: true });
    }

    function saveAddress(event){
        dispatch(addressActions.addAddress({
            name : props.name,
            mobile : props.mobile,
            house : props.house ,
            town : props.town,
            landmark: props.landmark,
            city : props.city,
            state : props.state,
            pin : props.pin
        }));

        toPayment();
    }

    return(
        <div className={classes.layout} onClick= {saveAddress}>
            <p className={classes.head}>Saved Address</p>
            <ul className={classes.address}>
                <li><b>{props.name}</b></li>
                <li>{props.mobile}</li>
                <li>{props.house},</li>
                <li>{props.town},</li>
                {props.landmark.trim() !== "" && <li>{props.landmark},</li>}
                <li>{props.city}&nbsp;{props.state}&nbsp;{props.pin}</li>
            </ul>
        </div>
    );
}

export default AddressSavedCard;


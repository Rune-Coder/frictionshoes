import React from 'react';

import { useNavigate } from 'react-router-dom';

import classes from './shoeMenuData.module.css';

//MEN SHOES

function CasualsData(props){
    let navigate = useNavigate();

    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/men-sneakers`); window.location.reload();}}>Sneakers</li>
            <li onClick = {() => {navigate(`/types/men-boats`); window.location.reload();}}>Boats</li>
            <li onClick = {() => {navigate(`/types/men-espadrilles`); window.location.reload();}}>Espadrilles</li>
            <li onClick = {() => {navigate(`/types/men-sandals`); window.location.reload();}}>Sandals</li>
        </ul>
    );
}

function DressData(props){
    let navigate = useNavigate();

    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/men-derbys`); window.location.reload();}}>Derby</li>
            <li onClick = {() => {navigate(`/types/men-oxfords`); window.location.reload();}}>Oxfords</li>
            <li onClick = {() => {navigate(`/types/men-brogues`); window.location.reload();}}>Brogues</li>
            <li onClick = {() => {navigate(`/types/men-monks`); window.location.reload();}}>Monks</li>
            <li onClick = {() => {navigate(`/types/men-loafers`); window.location.reload();}}>Loafers</li>
        </ul>
    );
}

function BootsData(props){
    let navigate = useNavigate();
    
    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/men-chelsea`); window.location.reload();}}>Chelsea</li>
            <li onClick = {() => {navigate(`/types/men-chukka`); window.location.reload();}}>Chukka</li>
            <li onClick = {() => {navigate(`/types/men-brogues`); window.location.reload();}}>Brogues</li>
            <li onClick = {() => {navigate(`/types/men-ankle`); window.location.reload();}}>Ankle</li>
            <li onClick = {() => {navigate(`/types/men-hiking`); window.location.reload();}}>Hiking</li>
        </ul>
    );
}

function SportsData(props){
    let navigate = useNavigate();

    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/men-walking`); window.location.reload();}}>Walking</li>
            <li onClick = {() => {navigate(`/types/men-football`); window.location.reload();}}>Foootball</li>
            <li onClick = {() => {navigate(`/types/men-golf`); window.location.reload();}}>Golf</li>
            <li onClick = {() => {navigate(`/types/men-cycling`); window.location.reload();}}>Cycling</li>
        </ul>
    );
}

//WOMEN SHOES

function WomenCasualsData(props){
    let navigate = useNavigate();

    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/women-sneakers`); window.location.reload();}}>Sneakers</li>
            <li onClick = {() => {navigate(`/types/women-heels`); window.location.reload();}}>Heels</li>
            <li onClick = {() => {navigate(`/types/women-espadrilles`); window.location.reload();}}>Espadrilles</li>
            <li onClick = {() => {navigate(`/types/women-sandals`); window.location.reload();}}>Sandals</li>
        </ul>
    );
}

function WomenBootsData(props){
    let navigate = useNavigate();
    
    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/women-chelsea`); window.location.reload();}}>Chelsea</li>
            <li onClick = {() => {navigate(`/types/women-knee`); window.location.reload();}}>Knee</li>
            <li onClick = {() => {navigate(`/types/women-wellington`); window.location.reload();}}>Wellington</li>
            <li onClick = {() => {navigate(`/types/women-ankle`); window.location.reload();}}>Ankle</li>
        </ul>
    );
}

function WomenDressData(props){
    let navigate = useNavigate();
    
    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/women-mary-janes `); window.location.reload();}}>Mary Janes</li>
            <li onClick = {() => {navigate(`/types/women-moccasins `); window.location.reload();}}>Moccasins</li>
            <li onClick = {() => {navigate(`/types/women-loafers`); window.location.reload();}}>Loafers</li>
        </ul>
    );
}

function WomenIndianData(props){
    let navigate = useNavigate();
    
    return(
        <ul className = {`${classes.shoeList} ${props.value && classes.shoeListSmall}  ${!props.value && ''}`} >
            <li onClick = {() => {navigate(`/types/women-juttis`); window.location.reload();}}>Juttis</li>
            <li onClick = {() => {navigate(`/types/women-kolhapuris`); window.location.reload();}}>Kolhapuris</li>
        </ul>
    );
}

export {CasualsData, DressData, BootsData, SportsData, WomenCasualsData, WomenBootsData, WomenIndianData, WomenDressData};

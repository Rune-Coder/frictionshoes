import React, { useState } from 'react';
import classes from './shoeMenu.module.css';
import {CasualsData, DressData, BootsData, SportsData, WomenCasualsData, WomenBootsData, WomenIndianData, WomenDressData} from './shoeMenuData';

function ShoeMenu(props) {
    const [addTypesMen, setAddTypesMen] = useState(false);
    const [addTypesWomen, setAddTypesWomen] = useState(false);

    function typesHandlerMen(event){
        if(addTypesMen === true)
            setAddTypesMen(false);
        else
            setAddTypesMen(true);
        return;
    }
    function typesHandlerWomen(event){
        if(addTypesWomen === true)
            setAddTypesWomen(false);
        else
            setAddTypesWomen(true);
        return;
    }

    return(
        <div className={classes.shoeAccordian}>
            <div className={classes.menu}>
                <ul>
                    <li onMouseOver = {typesHandlerMen} onMouseOut = {typesHandlerMen}>Men</li>
                    <li onMouseOver = {typesHandlerWomen} onMouseOut = {typesHandlerWomen}>Women</li>
                </ul>
            </div>
            <div className = {`${classes.types} ${addTypesMen && classes.activeTypes}  ${!addTypesMen && ''}`}>
                <div>
                    <span className={classes.typeHead}>Casual Wear</span>
                    <CasualsData />
                </div>
                <div>
                    <span className={classes.typeHead}>Boots</span>
                    <BootsData />
                </div>
                <div>
                    <span className={classes.typeHead}>Dress Wear</span>
                    <DressData />
                </div>
                <div>
                    <span className={classes.typeHead}>Sports Wear</span>
                    <SportsData />
                </div>
            </div>
            <div className = {`${classes.types} ${addTypesWomen && classes.activeTypes}  ${!addTypesWomen && ''}`}>
                <div>
                    <span className={classes.typeHead}>Casual Wear</span>
                    <WomenCasualsData />
                </div>
                <div>
                    <span className={classes.typeHead}>Boots</span>
                    <WomenBootsData />
                </div>
                <div>
                    <span className={classes.typeHead}>Dress Wear</span>
                    <WomenDressData />
                </div>
                <div>
                    <span className={classes.typeHead}>Indian Wear</span>
                    <WomenIndianData />
                </div>
            </div>
        </div>
    );
}

export default ShoeMenu;
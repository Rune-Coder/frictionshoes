import React, { useState } from 'react';

import classes from './shoeMenuSmall.module.css';
import {BootsData, CasualsData, DressData, SportsData, WomenBootsData, WomenCasualsData, WomenDressData, WomenIndianData} from '../shoeMenu/shoeMenuData';
import AngleRight from '../icons/angleRight';
import AngleDown from '../icons/angleDown';

function ShoeMenuSmall(props){

    const [dropMenuMen, setDropMenuMen] = useState(false);
    const [dropMenuWomen, setDropMenuWomen] = useState(false);

    const [dropMenuMenTypes1, setDropMenuMenTypes1] = useState(false);
    const [dropMenuMenTypes2, setDropMenuMenTypes2] = useState(false);
    const [dropMenuMenTypes3, setDropMenuMenTypes3] = useState(false);
    const [dropMenuMenTypes4, setDropMenuMenTypes4] = useState(false);

    const [dropMenuWomenTypes1, setDropMenuWomenTypes1] = useState(false);
    const [dropMenuWomenTypes2, setDropMenuWomenTypes2] = useState(false);
    const [dropMenuWomenTypes3, setDropMenuWomenTypes3] = useState(false);
    const [dropMenuWomenTypes4, setDropMenuWomenTypes4] = useState(false);

    function dropMen(event){
        if(dropMenuMen)
            setDropMenuMen(false);
        else
            setDropMenuMen(true);
    }

    function dropWomen(event){
        if(dropMenuWomen)
            setDropMenuWomen(false);
        else
            setDropMenuWomen(true);
    }

    function dropMenTypes1(event){
        if(dropMenuMenTypes1)
            setDropMenuMenTypes1(false);
        else
            setDropMenuMenTypes1(true);
    }

    function dropMenTypes2(event){
        if(dropMenuMenTypes2)
            setDropMenuMenTypes2(false);
        else
            setDropMenuMenTypes2(true);
    }

    function dropMenTypes3(event){
        if(dropMenuMenTypes3)
            setDropMenuMenTypes3(false);
        else
            setDropMenuMenTypes3(true);
    }

    function dropMenTypes4(event){
        if(dropMenuMenTypes4)
            setDropMenuMenTypes4(false);
        else
            setDropMenuMenTypes4(true);
    }

    function dropWomenTypes1(event){
        if(dropMenuWomenTypes1)
            setDropMenuWomenTypes1(false);
        else
            setDropMenuWomenTypes1(true);
    }

    function dropWomenTypes2(event){
        if(dropMenuWomenTypes2)
            setDropMenuWomenTypes2(false);
        else
            setDropMenuWomenTypes2(true);
    }

    function dropWomenTypes3(event){
        if(dropMenuWomenTypes3)
            setDropMenuWomenTypes3(false);
        else
            setDropMenuWomenTypes3(true);
    }

    function dropWomenTypes4(event){
        if(dropMenuWomenTypes4)
            setDropMenuWomenTypes4(false);
        else
            setDropMenuWomenTypes4(true);
    }

    return(
        <>
            <li className={classes.smallMenu}>

                <div className={classes.headItem} onClick={dropMen}>
                    <div>Men</div>
                    <div>
                        {!dropMenuMen && <span className={classes.angleRight}><AngleRight /></span>}
                        {dropMenuMen && <span className={classes.angleDown}><AngleDown /></span>}
                    </div>
                </div>

                {dropMenuMen && 
                <div className={classes.subHead}>
                    <ul className={classes.subList}>
                        <li className={classes.subHeadItem}>

                            <div className={classes.headItem} onClick={dropMenTypes1}>
                                <div>Casual Wear</div>
                                <div>
                                    {!dropMenuMenTypes1 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuMenTypes1 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuMenTypes1 && <div className={classes.subList}><CasualsData value= {true} /></div>}

                        </li>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropMenTypes2}>
                                <div>Boots</div>
                                <div>
                                    {!dropMenuMenTypes2 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuMenTypes2 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuMenTypes2 && <div className={classes.subList}><BootsData value= {true} /></div>}

                        </li>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropMenTypes3}>
                                <div>Dress Wear</div>
                                <div>
                                    {!dropMenuMenTypes3 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuMenTypes3 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuMenTypes3 && <div className={classes.subList}><DressData value= {true} /></div>}

                        </li>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropMenTypes4}>
                                <div>Sports Wear</div>
                                <div>
                                    {!dropMenuMenTypes4 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuMenTypes4 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuMenTypes4 && <div className={classes.subList}><SportsData value= {true} /></div>}

                        </li>
                    </ul>
                </div>}

            </li>

            <li className={classes.smallMenu}>

                <div className={classes.headItem} onClick={dropWomen}>
                    <div>Women</div>
                    <div>
                        {!dropMenuWomen && <span className={classes.angleRight}><AngleRight /></span>}
                        {dropMenuWomen && <span className={classes.angleDown}><AngleDown /></span>}
                    </div>
                </div>

                {dropMenuWomen && 
                <div className={classes.subHead}>
                    <ul className={classes.subList}>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropWomenTypes1}>
                                <div>Casual Wear</div>
                                <div>
                                    {!dropMenuWomenTypes1 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuWomenTypes1 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuWomenTypes1 && <div className={classes.subList}><WomenCasualsData value= {true} /></div>}

                        </li>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropWomenTypes2}>
                                <div>Boots</div>
                                <div>
                                    {!dropMenuWomenTypes2 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuWomenTypes2 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuWomenTypes2 && <div className={classes.subList}><WomenBootsData value= {true} /></div>}

                        </li>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropWomenTypes3}>
                                <div>Dress Wear</div>
                                <div>
                                    {!dropMenuWomenTypes3 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuWomenTypes3 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuWomenTypes3 && <div className={classes.subList}><WomenDressData value= {true} /></div>}

                        </li>
                        <li className={classes.subHeadItem}>
                            
                            <div className={classes.headItem} onClick={dropWomenTypes4}>
                                <div>Indian Wear</div>
                                <div>
                                    {!dropMenuWomenTypes4 && <span className={classes.angleRight}><AngleRight /></span>}
                                    {dropMenuWomenTypes4 && <span className={classes.angleDown}><AngleDown /></span>}
                                </div>
                            </div>

                            {dropMenuWomenTypes4 && <div className={classes.subList}><WomenIndianData value= {true} /></div>}

                        </li>
                    </ul>
                </div>}

            </li>
        </>
    );
}

export default ShoeMenuSmall;
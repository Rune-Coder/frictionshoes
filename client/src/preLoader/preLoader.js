import React from 'react';

import Preloader from '../image/preLoader.gif';
import classes from './preLoader.module.css';

function PreLoader(props){
    return (
        <div className={classes.preLoader}>
            <img src = {Preloader} alt = "Loading..."  className={classes.loaderImg}></img>
        </div>
    );
}

export default PreLoader;
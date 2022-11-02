import React from 'react';

import classes from './notificationCard.module.css';

function NotificationCard(props){

    return(
        <div className={classes.notificationHolder}>
        <div className={classes.layout}>
            <p className={classes.msg}>{props.value}</p>
        </div>  
        </div>
    );
}

export default NotificationCard
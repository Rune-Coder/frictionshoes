import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import classes from './myProfile.module.css';
import ProfileEdit from './profileEdit';

function MyProfile(props){

    const loginSub = useSelector((state) => state.login.loggedin);
    const userSub = useSelector((state) => state.login.userData);
    const [edit, setEdit] = useState(false);

    
    useEffect(() => {
        document.title = 'Profile';
        window.scrollTo(0, 0);
    });

    function toEdit(event){
        if(edit)
            setEdit(false);
        else
            setEdit(true);
        return;
    }
    return (
        <div className={classes.profile}>
            {!edit && <div>
                <p className={classes.head}>Profile Details</p>
                <div className={classes.accDetails}>
                    <div>Full Name</div>
                    {loginSub && <div>{userSub.name}</div>}
                    {!loginSub && <div>- not added -</div>}

                    <div>Mobile Number</div>
                    {loginSub && <div>{userSub.mobile}</div>}
                    {!loginSub && <div>- not added -</div>}

                    <div>Email ID</div>
                    {loginSub && <div>{userSub.email}</div>}
                    {!loginSub && <div>- not added -</div>}

                    <div>Gender</div>
                    {loginSub && <div>{userSub.gender}</div>}
                    {!loginSub && <div>- not added -</div>}
                </div>
                <button type= "button" onClick = {toEdit} className={classes.save}>EDIT</button>
            </div>}
            {edit && <ProfileEdit />}
        </div>
    );
}

export default MyProfile;
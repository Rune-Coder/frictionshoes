import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginStore';

function UserData(token){
    const [user, setUser] = useState({});
    var loggedin = true;
    var newtoken = token;

    useEffect(() =>{
        async function getData(){
    
            const res = await fetch(`/api/user/profile`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${newtoken}`
                }
            });
        
            const data = await res.json();
            
            if(res.ok)
                setUser(data);
    
        }

        getData();

    }, [newtoken]);

    
    const dispatch = useDispatch();
    
    if(Object.keys(user).length === 0){
        token = "";
        loggedin = false;
    }

    dispatch(loginActions.loginVerify({
        token: token,
        userData: user,
        loggedin: loggedin
    }));

    return loggedin;
}

export { UserData };
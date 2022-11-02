import { useState, useEffect } from 'react';

function UserHistory(token){
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

    
    if(Object.keys(user).length === 0){
        token = "";
        loggedin = false;
    }

    if(!loggedin)
        return;
    
    //get cart data mongodb
    async function getCartData(email){

        const res = await fetch("/api/user/history-get", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
    
        const data = await res.json();

        if(!res.ok)
            return;
        
        
        if(data.cart && data.bill){
            localStorage.setItem("products", JSON.stringify(data.cart));
            localStorage.setItem("billStore", JSON.stringify(data.bill));
            if(data.bill.length === 0){
                const bill = [{ tmrp: 0, tdis: 0, tdelfee: 0, amount: 0, len: 0 }];
                localStorage.setItem("billStore", JSON.stringify(bill));
            }
        }

        if(data.wish){
            localStorage.setItem("wishStore", JSON.stringify(data.wish));
        }

    }

    getCartData(user.email);
}

export { UserHistory };
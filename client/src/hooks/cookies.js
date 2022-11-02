import Cookies from 'js-cookie'

function SetCookie(key, val){
    Cookies.set(key, val, { expires: 365 });
}

function GetCookie(key){
    return Cookies.get(key);
}

function RemoveCookie(key){
    Cookies.remove(key);
}


export {SetCookie, GetCookie, RemoveCookie};
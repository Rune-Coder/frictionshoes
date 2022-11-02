import React from 'react';

import { useNavigate } from 'react-router-dom';

import SearchIcon from '../icons/searchIcon';
import classes from './searchBox.module.css';

function SearchBox(props){

    let navigate = useNavigate();

    function toSearch(event){
        var keyCode = event ? (event.which ? event.which : event.keyCode) : event.keyCode;
        const keyword = event.target.value;
        if(keyCode === 13)
        {
            const path = `/search/`+keyword;
            navigate(path, { replace: true });
            window.location.reload();
        }
        return;
    }

    return(
        <div className={classes.search}>
            <span  className={classes.searchIcon}><SearchIcon /></span>
            <input type="text" name="search" placeholder='Search for boots, sneakers, etc.' onKeyDown={toSearch} />
        </div>
    );
}

export default SearchBox;
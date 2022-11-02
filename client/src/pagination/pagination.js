import React from 'react';

import classes from './pagination.module.css';

function Pagination(props){

    var pages = [];

    for(var i = 1; i <= Math.ceil(props.totalPost/ props.postPerPage); i++){
        pages.push(i);
    }

    return (
        <div className= {classes.pages}>
            {pages.map((page, index) => {
                return <button key = {index} onClick = {() =>  {props.setCurrPage(page); window.scrollTo(0, 0);}} className={page === props.currPage ? classes.pageActive : classes.pageInactive}>{page}</button>
            })}
        </div>
    );
}

export default Pagination;
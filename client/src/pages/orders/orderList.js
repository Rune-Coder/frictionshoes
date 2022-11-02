import React from 'react';


function OrderList(props){
    return(
        <li>
            <div>{props.product}</div>
            <div>{props.company}</div>
        </li>
    );
}

export default OrderList;
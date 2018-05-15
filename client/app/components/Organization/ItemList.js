import React from 'react';
import {Link } from "react-router-dom";

const ItemList = props => {
    let { value } = props;

    return(
        <li key={value.id} >
            <a 
                onClick={() => props.redirectProjects(value.id)}>
                    {value.name}
            </a>
        </li>
    );
}

export default ItemList;
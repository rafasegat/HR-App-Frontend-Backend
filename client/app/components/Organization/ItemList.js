import React from 'react';
import {Link } from "react-router-dom";

const ItemList = props => {
    let { value } = props;
    return(
        <li key={value.id}>
            <Link to={'/'+value.id}>{value.name}</Link>
        </li>
    );
}

export default ItemList;
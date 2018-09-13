import React from 'react';

const BtnEdit = props => {
    return (
        <i className="far fa-edit btn-icon" 
            onClick={event => props.handleEdit(props.row.original.id)}>
        </i>
    );
};

export default BtnEdit;
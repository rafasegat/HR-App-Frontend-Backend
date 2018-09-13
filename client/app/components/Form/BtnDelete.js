import React from 'react';

const BtnDelete = props => {
    return (
        <i className="far fa-trash-alt btn-icon" 
            onClick={event => props.handleDelete(props.row.original.id)}>
        </i>
    );
};

export default BtnDelete;
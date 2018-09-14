import React from 'react';

const BtnDelete = props => {

    let showTooltip = false;

    return (
        <div className="btn-delete">
            <div className="tooltip-yes-no">
                Are you sure?
                <span className="tooltip-yes" onClick={event => props.handleDelete(props.row.original.id)}>Yes</span>
                <span className="tooltip-no" >Cancel</span>
            </div>
            <i className="far fa-trash-alt btn-icon" onClick={showTooltip=true} ></i>
        </div>
    );
};

export default BtnDelete;
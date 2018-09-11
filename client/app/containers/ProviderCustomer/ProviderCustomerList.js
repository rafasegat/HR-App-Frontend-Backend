import React from 'react';
import ReactTable from "react-table";

const ProviderCustomerList = (props) => {
    const { 
        list,
        openModal,
        redirectParticipants
    } = props;
    
    return(
        <div className="provider-customer">
            {list!=undefined && list.length > 0  ? 
               <div>
                    <ReactTable
                        data={list}
                        columns={[
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Email",
                            accessor: "email"
                        },
                        {
                            Header: "Edit",
                            accessor: "",
                            width: 100,
                            Cell: row => (
                                <div className="btn-action">
                                    <i className="far fa-edit btn-icon" onClick={event => props.handleEdit(row.original.id)}></i>
                                    <i className="far fa-trash-alt btn-icon" onClick={event => props.handleDelete(row.original.id)}></i>
                                </div>
                            )
                        }
                            
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </div>
            :
                <div>No data. Create the first one!</div>
            }
            <button className="btn-primary" onClick={openModal}>
                NEW
            </button>
        </div>
    );

}

export default ProviderCustomerList;
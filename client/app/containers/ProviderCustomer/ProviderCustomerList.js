import React from 'react';
import ReactTable from "react-table";
import BtnDelete from '../../components/Form/BtnDelete';
import BtnEdit from '../../components/Form/BtnEdit';

const ProviderCustomerList = (props) => {
    const { 
        list,
        handleNew,
        handleEdit,
        handleDelete
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
                            Header: "Action",
                            accessor: "",
                            width: 75,
                            Cell: row => (
                                <div className="btn-action">
                                    <BtnEdit handleEdit={props.handleEdit} row={row}/>
                                    <BtnDelete handleDelete={props.handleDelete} row={row}/>
                                </div>
                            )
                        }
                            
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                if(typeof rowInfo !== 'undefined')
                                    props.handleEdit(rowInfo.original.id);
                              }
                            }
                        }}
                    />
                </div>
            :
                <div>No data. Create the first one!</div>
            }
            <button className="btn-primary" onClick={handleNew}>NEW</button>
        </div>
    );

}

export default ProviderCustomerList;
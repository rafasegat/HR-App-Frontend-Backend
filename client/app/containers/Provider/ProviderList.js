import React from 'react';
import ReactTable from "react-table";
import { relationship_provider } from '../../flux/provider/ProviderAction';

const ProviderList = (props) => {
    const { 
        listProviders,
        isLoading
    } = props;
    
    return(
        <div className="providers">
            <ReactTable
                data={listProviders}
                columns={[
                {
                    Header: "Feedback Provider",
                    accessor: "name"
                    
                },
                {
                    Header: "Relationship",
                    accessor: "relationship",
                    width: 150,
                    Cell: row => (
                        <span>
                            { relationship_provider.filter(e =>  row.value == e.key)[0].value }
                        </span>
                      )
                },
                {
                    Header: "Status",
                    accessor: "status",
                    width: 100,
                    Cell: row => (
                        <span>
                          <span style={{
                            color: row.value === 1 ? '#ffbf00'
                                 : row.value === 2 ? '#ff2e00'
                                 : '#57d500',
                            transition: 'all .3s ease'
                            }}>
                            &#x25cf;&nbsp;
                            </span> 
                            {
                              row.value === 1 ? 'Invited'
                            : row.value === 2 ? 'Responded'
                            : '--'
                            }
                        </span>
                      )
                },
                {
                    Header: "Action",
                    className: "center",
                    width: 100,
                    Cell: row => (
                        <i className="far fa-trash-alt btn-icon" onClick={event => props.handleDeleteProvider(row.original.id)}></i>
                    )
                },
                ]}
                defaultPageSize={5}
                loading={isLoading}
                className="-striped -highlight"
            />

        </div>
           
    );

}

export default ProviderList;
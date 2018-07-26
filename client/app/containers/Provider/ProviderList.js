import React from 'react';
import ReactTable from "react-table";

const ProviderList = (props) => {
    const { 
        listProviders
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
                    accessor: "provider_relationship",
                    width: 150,
                    Cell: row => (
                        <span>
                            {
                              row.value === 1 ? 'Self Assessment'
                            : row.value === 2 ? 'Line Manager'
                            : row.value === 3 ? 'Peer'
                            : row.value === 4 ? 'Direct Report'
                            : row.value === 5 ? 'Customer'
                            : row.value === 6 ? 'Supplier'
                            : '--'
                            }
                        </span>
                      )
                },
                {
                    Header: "Status",
                    accessor: "provider_status",
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
                    accessor: "provider_status",
                    width: 100,
                    Cell: row => (
                        <a href="#" onClick={event => openFeedbackModal(row.original)} >
                          Send email
                        </a>
                    )
                },
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />

        </div>
           
    );

}

export default ProviderList;
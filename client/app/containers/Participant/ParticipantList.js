import React from 'react';
import ItemList from '../../components/Participant/ItemList';
import ReactTable from "react-table";

const ParticipantList = (props) => {
    const { 
        list,
        openModal,
        openFeedbackModal,
        redirectParticipants
    } = props;
    
    return(
        <div className="participants">
            {list.length > 0  ? 
               <div>
                    <ReactTable
                        data={list}
                        columns={[
                        {
                            Header: "Person being assessed",
                            columns: [
                            {
                                Header: "Name",
                                accessor: "name"
                            },
                            {
                                Header: "Position",
                                id: "position",
                                width: 300
                            }
                            ]
                        },
                        {
                            Header: "Situation",
                            columns: [
                            {
                                Header: "Status",
                                accessor: "status",
                                width: 300,
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
                                          row.value === 1 ? 'Waiting for feedback'
                                        : row.value === 2 ? 'Choosing feedback providers'
                                        : '--'
                                        }
                                    </span>
                                  )
                            }
                            ]
                        },
                        {
                            Header: 'Action',
                            columns: [
                            {
                                Header: "Edit",
                                accessor: "visits",
                                width: 100,
                                Cell: row => (
                                    <a href="#"
                                       onClick={event => openFeedbackModal(row.original.id)} >
                                      Edit
                                    </a>
                                  )
                            }
                            ]
                        }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </div>
            :
                <div>No participant. Create the first one!</div>
            }
            <button className="btn-primary" onClick={openModal}>Create new participant</button>
        </div>
    );

}

export default ParticipantList;
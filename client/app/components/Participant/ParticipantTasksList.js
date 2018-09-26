import React from 'react';
import ReactTable from "react-table";
import BtnEdit from '../../components/Form/BtnEdit';

const ParticipantTaskList = (props) => {
    const { 
        listParticipantTasks
    } = props;
    
    return(
        <div className="participants">
            {listParticipantTasks!=undefined && listParticipantTasks.length > 0  ? 
               <div className="participants-list">
                    <ReactTable
                        data={listParticipantTasks}
                        columns={[
                        {
                            Header: "Task",
                            Cell: row => (
                                <span>Provide feedback</span>
                            )
                        },
                        {
                            Header: "Feedback receiver",
                            accessor: "name_participant_feedback_receiver"
                        },
                        {
                            Header: "Status",
                            accessor: "status",
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
                                    : row.value === 3 ? 'Choosing feedback providers'
                                    : '--'
                                    }
                                </span>
                                )
                            
                        },
                        {
                            Header: "Action",
                            className: 'center',
                            Cell: row => (
                                <>
                                    <a href="#">View Email</a>  
                                    <a href="#">Delete Invitation</a>   
                                </>
                            )
                        }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTdProps={( column ) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                if(column.Header=='Action')
                                    return;
                              }
                            }
                        }}
                    />
                </div>
            :
                <div>No tasks. Don't worry!</div>
            }
        </div>
    );

}

export default ParticipantTaskList;
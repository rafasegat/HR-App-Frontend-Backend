import React from 'react';
import ReactTable from "react-table";
import BtnEdit from '../../components/Form/BtnEdit';
import Btn  from '@atlaskit/button';
import BtnDelete from '../../components/Form/BtnDelete';
import "./ParticipantList.scss";

const ParticipantList = (props) => {
    const { 
        list,
        openFeedbackModal,
        isLoading,
        showTooltip
    } = props;
    
    return(
        <div className="participants">
            {list!=undefined && list.length > 0  ? 
               <div className="participants-list">
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
                                accessor: "position",
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
                                width: 200,
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
                            Header: '',
                            columns: [
                            {
                                Header: "Action",
                                className: 'center',
                                width: 75,
                                Cell: row => (
                                    <>
                                        <BtnEdit handleEdit={openFeedbackModal} param={row.original.id}/>
                                        <i className="far fa-user btn-icon" 
                                            onClick={event => props.handleEditParticipant(row.original.id)}>
                                        </i>
                                        <BtnDelete 
                                            handleDelete={props.handleDeleteParticipant} 
                                            handleTooltip={props.handleTooltip} 
                                            showTooltip={showTooltip}
                                            row={row}
                                        />
                                    </>
                                  )
                            }
                            ]
                        }
                        ]}
                        defaultPageSize={10}
                        loading={isLoading}
                        className="-striped -highlight"
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                if(column.Header=='Action')
                                    return;

                                if(typeof rowInfo !== 'undefined')
                                    props.openFeedbackModal(rowInfo.original);
                                
                              }
                            }
                        }}
                    />
                </div>
            :
                <div>No participant. Create the first one!</div>
            }
            
            <Btn onClick={props.handleNewParticipant} appearance="primary">NEW PARTICIPANT</Btn>

        </div>
    );

}

export default ParticipantList;
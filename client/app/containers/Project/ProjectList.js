import React from 'react';
import ReactTable from "react-table";
import BtnEdit from '../../components/Form/BtnEdit';
import Btn  from '@atlaskit/button';

const ProjectList = (props) => { 
    const { 
        list,
        handleNew,
        handleEdit,
        isLoading
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
                            Header: "Status",
                            accessor: "status",
                            width: 200,
                            Cell: row => (
                                <span>
                                  <span style={{
                                    color: row.value === 1 ? '#ffbf00'
                                         : row.value === 2 ? '#ff2e00'
                                         : '#000000',
                                    transition: 'all .3s ease'
                                    }}>
                                    &#x25cf;&nbsp;
                                    </span> 
                                    {
                                      row.value === 1 ? 'In Progress'
                                    : row.value === 2 ? 'On Hold'
                                    : '--'
                                    }
                                </span>
                              )
                        },
                        {
                            Header: "Action",
                            accessor: "",
                            width: 75,
                            Cell: row => (
                                <div className="btn-action">
                                    <BtnEdit handleEdit={handleEdit} param={row.original.id}/>
                                </div>
                            )
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
                                    props.redirectToParticipants(rowInfo.original.id);
                              }
                            }
                        }}
                    />
                </div>
            :
                <div>No projects. Create the first one!</div>
            }
            <Btn  
                onClick={handleNew}
                appearance='primary'>
                New
            </Btn>
        </div>
    );

}

export default ProjectList;
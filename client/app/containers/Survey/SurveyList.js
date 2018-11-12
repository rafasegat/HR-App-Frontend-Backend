import React from 'react';
import ReactTable from "react-table";
import BtnDelete from '../../components/Form/BtnDelete';
import BtnEdit from '../../components/Form/BtnEdit';

const SurveyList = (props) => {
    const { 
        list,
        handleNew,
        handleEdit,
        handleDelete,
        handleTooltip,
        showTooltip,
        redirectDesign
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
                            Header: "Action",
                            accessor: "",
                            width: 75,
                            Cell: row => (
                                <div className="btn-action">
                                    
                                    <i className="far fa-object-ungroup btn-icon" 
                                       onClick={event => redirectDesign(row.original.id)}>
                                    </i>

                                    <BtnEdit 
                                        handleEdit={handleEdit} 
                                        param={row.original.id}
                                    />
                                    
                                    <BtnDelete 
                                        handleDelete={handleDelete} 
                                        handleTooltip={handleTooltip} 
                                        showTooltip={showTooltip}
                                        row={row}
                                    />
                                </div>
                            )
                        }
                            
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                if(column.Header=='Action')
                                    return;

                                if(typeof rowInfo !== 'undefined')
                                    redirectDesign(rowInfo.original.id);
                                
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

export default SurveyList;
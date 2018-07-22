import React from 'react';
import ReactTable from "react-table";

const ProviderList = (props) => {
    const { 
        providerList
    } = props;
    
    return(
        <div className="providers">
            
            <ReactTable
                data={providerList}
                columns={[
                {
                    Header: "Feedback Provider",
                    id: "name"
                    
                },
                {
                    Header: "Relationship",
                    id: "relationship",
                    width: 100
                },
                {
                    Header: "Status",
                    id: "status",
                    width: 100
                },
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />

        </div>
           
    );

}

export default ProviderList;
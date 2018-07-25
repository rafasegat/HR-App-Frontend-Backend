import React from 'react';
import ReactTable from "react-table";

const ProviderList = (props) => {
    const { 
        listProviders
    } = props;
    console.log(listProviders)
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
                    width: 120
                },
                {
                    Header: "Status",
                    accessor: "provider_status",
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
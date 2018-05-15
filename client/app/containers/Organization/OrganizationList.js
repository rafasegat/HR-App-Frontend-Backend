import React from 'react';
import ItemList from '../../components/Organization/ItemList';

const OrganizationList = (props) => {

    const { 
        list,
        redirectProjects,
        openModal
    } = props;

    return(
        <div className="organizations">
            {list.length > 0 ? 
                <ul className="organization-list">
                    {
                        list.map((value) => 
                            <ItemList 
                                value={value} 
                                key={value.id}
                                redirectProjects={redirectProjects} />
                        )
                    }
                </ul>
            :
                <div>No organization. Create the first one!</div>
            } 
            
            <button onClick={openModal}>Create new organization</button>
            
        </div>
    );

}

export default OrganizationList;
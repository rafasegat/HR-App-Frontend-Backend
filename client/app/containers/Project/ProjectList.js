import React from 'react';
import ItemList from '../../components/Project/ItemList';

const OrganizationList = (props) => {

    const { 
        list,
        redirectProjects,
        openModal
    } = props;

    return(
        <div className="organizations">
            {list.length > 0 ? 
                <ul className="project-list">
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
                <div>No project. Create the first one!</div>
            } 
            
            <button onClick={openModal}>Create new project</button>
            
        </div>
    );

}

export default OrganizationList;
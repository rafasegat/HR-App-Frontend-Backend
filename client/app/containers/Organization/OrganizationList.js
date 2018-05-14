import React from 'react';
import ItemList from '../../components/Organization/ItemList';

const OrganizationList = (props) => {

    const { list } = props;

    return(
        <div className="organizations">
            {list.length > 0 ? 
                <ul className="organization-list">
                    {
                        list.map((value) => 
                            <ItemList value={value} key={value.id} />
                        )
                    }
                </ul>
            :
                <div>No organization. Create the first one!</div>
            } 
            
            <button onClick={props.openModal}>Create new organization</button>
            
        </div>
    );

}

export default OrganizationList;
import React from 'react';
import ItemList from '../../components/Participant/ItemList';

const ParticipantList = (props) => {
    const { 
        list,
        openModal,
        redirectParticipants
    } = props;
    
    return(
        <div className="projects">
            {list.length > 0  ? 
                <ul className="project-list">
                    {
                        list.map((value) => 
                            <ItemList 
                                value={value} 
                                key={value.id}
                            />
                        )
                    }
                </ul>
            :
                <div>No participant. Create the first one!</div>
            } 
            
            <button className="btn-primary" onClick={openModal}>Create new participant</button>
            
        </div>
    );

}

export default ParticipantList;
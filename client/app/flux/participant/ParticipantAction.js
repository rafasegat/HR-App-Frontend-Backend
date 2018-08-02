import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    providers: function(payload){
        Dispatcher().dispatch(PROVIDERS, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ParticipantStore').addListener(fn);
    }
}

export const ALL = 'all-participants';
export const PROVIDERS = 'providers-participants';
export const SAVE = 'save-participants';

// export const status = {
//     waiting_for_feedback: { id: 1, name: 'Waiting for feedback' },
//     choosing_feedback_providers: { id: 2, name: 'Choosing feedback providers' },
//     closed: { id: 3, name: 'Closed' }
// };

export const status = [
    { id_status: 1, name: 'Waiting for feedback' },
    { id_status: 2, name: 'Choosing feedback providers' },
    { id_status: 3, name: 'Closed' }
];

// 1 - Self
// 2 - Line Manager
// 3 - Peer
// 4 - Direct Report
// 5 - Customer
// 6 - Supplier
export const relationship_provider = [
    { id_relationship: 1, name: 'Self' },
    { id_relationship: 2, name: 'Line Manager' },
    { id_relationship: 3, name: 'Peer' },
    { id_relationship: 4, name: 'Direct Report' },
    { id_relationship: 5, name: 'Customer' },
    { id_relationship: 6, name: 'Supplier' }
];


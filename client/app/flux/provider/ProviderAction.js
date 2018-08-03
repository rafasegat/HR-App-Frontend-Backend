import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ProviderStore').addListener(fn);
    }
}

export const ALL = 'all-providers';
export const SAVE = 'save-providers';


export const relationship_provider = [
    { key: 1, name: 'Self Assessment' },
    { key: 2, name: 'Line Manager' },
    { key: 3, name: 'Peer' },
    { key: 4, name: 'Direct Report' },
    { key: 5, name: 'Customer' },
    { key: 6, name: 'Supplier' }
];


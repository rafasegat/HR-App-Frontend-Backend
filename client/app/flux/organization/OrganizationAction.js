import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('OrganizationStore').addListener(fn);
    }
}

export const ALL = 'all-organizations';
export const SAVE = 'save-organization';

export const organization_status_info = {
    in_progress: { key: 1, value: 'In Progress' },
    on_hold: { key: 2, value: 'On Hold ' },
    concluded: { key: 3, value: 'Concluded' }
};

export const organization_status = [
    { key: 1, value: 'In Progress' },
    { key: 2, value: 'On Hold' },
    { key: 3, value: 'Concluded' }
];
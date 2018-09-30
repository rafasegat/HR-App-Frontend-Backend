import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ProjectStore').addListener(fn);
    }
}

export const ALL = 'all-projects';
export const SAVE = 'save-project';

export const project_status_info = {
    in_progress: { key: 1, value: 'In Progress' },
    on_hold: { key: 2, value: 'On Hold ' },
    concluded: { key: 3, value: 'Concluded' }
};

export const project_status = [
    { key: 1, value: 'In Progress' },
    { key: 2, value: 'On Hold' },
    { key: 3, value: 'Concluded' }
];
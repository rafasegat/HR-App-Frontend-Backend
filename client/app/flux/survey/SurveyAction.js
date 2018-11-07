import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    delete: function(payload){
        Dispatcher().dispatch(DELETE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('SurveyStore').addListener(fn);
    }
}

export const ALL = 'all-survey';
export const SAVE = 'save-survey';
export const DELETE = 'delete-survey';
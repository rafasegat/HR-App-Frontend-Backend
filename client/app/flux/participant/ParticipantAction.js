import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch(ALL, payload);
    },
    save: function(payload){
        Dispatcher().dispatch(SAVE, payload);
    },
    addListener(fn){
        Dispatcher().getStore('ParticipantStore').addListener(fn);
    }
}

export const ALL = 'all-participants';
export const SAVE = 'save-participants';

export const status = {
    waiting_for_feedback: { id: 1, name: 'Waiting for feedback' },
    choosing_feedback_providers: { id: 2, name: 'Choosing feedback providers' },
    closed: { id: 3, name: 'Closed' }
};
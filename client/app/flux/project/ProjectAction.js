import Dispatcher from "../Dispatcher";

export default {
    all: function(payload){
        Dispatcher().dispatch("all", payload);
    },
    save: function(payload){
        Dispatcher().dispatch("save", payload);
    },
    addListener(fn){
        Dispatcher().getStore('ProjectStore').addListener(fn);
    }
}
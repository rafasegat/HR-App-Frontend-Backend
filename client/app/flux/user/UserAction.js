import Dispatcher from "../Dispatcher";

export default {
    verify_token: function(payload){
        Dispatcher().dispatch(VERIFY_TOKEN, payload);
    },
    signin: function(payload){
        Dispatcher().dispatch(SIGNIN, payload);
    },
    addListener(fn){
        Dispatcher().getStore('UserStore').addListener(fn);
    }
}

export const VERIFY_TOKEN = 'verify-token-user';
export const SIGNIN = 'signin-user';
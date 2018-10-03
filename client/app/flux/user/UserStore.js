import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import * as Action from '../user/UserAction';

class UserStore extends Store{
    reduce(type, payload){
        if(type===Action.VERIFY_TOKEN){
            this.verify_token(type, payload);
        }
        if(type===Action.SIGNIN){
            this.signin(type, payload);
        }
    }

    verify_token(type, payload){
        let instance = this;
        fetch('account/verify?token'+payload.token)
        .then(res => res.json())
        .then(json => { instance.invokeListeners(type, { status:'success', data: json }); })
        .catch(err => { instance.invokeListeners(type, {status:err+'error'}); });
    }

    signin(type, payload){
        let instance = this;
        if(payload.id == -1){
            delete payload.id;
        }
        fetch('/account/signin', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, { status:'success', data: json }); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }
}

export default new UserStore(Dispatcher);
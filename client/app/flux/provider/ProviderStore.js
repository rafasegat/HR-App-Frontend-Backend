import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/Storage';
import * as Action from '../../flux/provider/ProviderAction';

class ProviderStore extends Store{
    reduce(type, payload){
        if(type===Action.ALL){
            this.all(type, payload);
        }
        if(type===Action.SAVE){
            this.save(type, payload);
        }
    }

    save(type, payload){
        let instance = this;
        fetch('/api/provider/save', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => {
          instance.invokeListeners(type, {status:'success'}); 

        }).catch(err => {
            instance.invokeListeners(type, {status:'error'});
        });
    }

    all(type, payload){
        let instance = this;
        fetch('/api/provider/all', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ 
                id_user: getFromStorage('FB360_Token').user
            }),
        }).then(res => res.json())
          .then(json => {
            instance.invokeListeners(type, { data: json.data, status: 'success' });
            
        }).catch(err => {
            instance.invokeListeners(type, { status: 'Error: '+err });
        });
    }
}

export default new ProviderStore(Dispatcher);
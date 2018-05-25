import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/Storage';
import * as Action from '../../flux/organization/OrganizationAction';

class OrganizationStore extends Store{
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
        fetch('/api/organization/save', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
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
        fetch('/api/organization/all', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                id_user: getFromStorage('feedback360').user
            }),
        }).then(res => res.json())
          .then(json => {
            instance.invokeListeners(type, { data: json.data, status: 'success' });
            
        }).catch(err => {
            instance.invokeListeners(type, { status: 'Error: '+err });
        });
    }
}

export default new OrganizationStore(Dispatcher);
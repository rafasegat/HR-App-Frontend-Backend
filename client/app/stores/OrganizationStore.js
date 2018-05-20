import Dispatcher from "../utils/Dispatcher";
import Store from "../utils/Store";
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/Storage';

class OrganizationStore extends Store{
    reduce(type, payload){
        if(type==="all"){
            this.all(type, payload);
        }
        if(type==="save"){
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
                user: getFromStorage('feedback360').user
            }),
        }).then(res => res.json())
          .then(json => {
            console.log(json)
            if(!json.success){
                instance.invokeListeners(type, {status:'error'});
            } else{
                instance.invokeListeners(type, {data:json.data, status:'success'});
            }
            
        }).catch(err => {
            instance.invokeListeners(type, {status:'error'});
        });
    }
}

export default new OrganizationStore(Dispatcher);
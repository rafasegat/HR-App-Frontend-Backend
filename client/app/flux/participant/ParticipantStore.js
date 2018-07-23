import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/Storage';
import * as Action from '../../flux/participant/ParticipantAction';

class ParticipantStore extends Store{
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
        fetch('/api/participant/save', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({
                data: payload,
                param: {id_project: getFromStorage('FB360_Project').id_project}
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
        fetch('/api/participant/all', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                id_project: payload
            }),
        }).then(res => res.json())
          .then(json => {
            
            if(json.status==404){
                console.log('fdfd')
                document.getElementById('btn-logout').click();
            }

            instance.invokeListeners(type, {data: json.data, status:'success'});
            
        }).catch(err => {
            instance.invokeListeners(type, {status:'error'});
        });
    }

    providers(type, payload){
        let instance = this;
        fetch('/api/participant/provider', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                id_partcipant: payload
            }),
        }).then(res => res.json())
          .then(json => {
                instance.invokeListeners(type, {data: json.data, status:'success'});
            
        }).catch(err => {
            console.log(err)
            instance.invokeListeners(type, {status:'error'});
        });
    }
}

export default new ParticipantStore(Dispatcher);
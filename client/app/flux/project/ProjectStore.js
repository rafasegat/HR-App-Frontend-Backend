import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/Storage';
import * as Action from '../../flux/project/ProjectAction';

class ProjectStore extends Store{
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
        fetch('/api/project/save', {
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
        fetch('/api/project/all', {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'x-access-token': getFromStorage('feedback360').token
                     },
            body: JSON.stringify({ 
                id_organization: getFromStorage('feedback360_organization').organization
            }),
        }).then(res => res.json())
          .then(json => {
                instance.invokeListeners(type, {data: json.data, status:'success'});
            
        }).catch(err => {
            instance.invokeListeners(type, {status:'error'});
        });
    }
}

export default new ProjectStore(Dispatcher);
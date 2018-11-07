import Dispatcher from "../Dispatcher";
import Store from "../Store";
import 'whatwg-fetch';
import { getFromStorage } from '../../utils/Storage';
import * as Action from '../../flux/survey/SurveyAction';

class SurveyStore extends Store{
    reduce(type, payload){
        if(type===Action.ALL){
            this.all(type, payload);
        }
        if(type===Action.SAVE){
            this.save(type, payload);
        }
        if(type===Action.DELETE){
            this.delete(type, payload);
        }
    }

    save(type, payload){
        let instance = this;
        fetch('/api/survey/save', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, {status:'success'}); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    delete(type, payload){
        let instance = this;
        fetch('/api/survey/delete', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({
                data: payload
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, {status:'success' }); })
          .catch(err => { instance.invokeListeners(type, {status:'error'}); });
    }

    all(type, payload){
        let instance = this,
            query = `{ 
                surveys( 
                    id_organization:  ${payload.id_organization} 
                )
                { 
                    id, 
                    name
                } 
            }`;
            
        fetch('/graphql', {
            method: 'POST',
            headers: instance.headers(),
            body: JSON.stringify({ 
                query: query 
            }),
        }).then(res => res.json())
          .then(json => { instance.invokeListeners(type, { data: json.data.surveys, status: 'success' }); })
          .catch(err => { instance.invokeListeners(type, { status: 'Error: '+err }); });
    }

}

export default new SurveyStore(Dispatcher);
import Dispatcher from "../utils/Dispatcher";
import Store from "../utils/Store";
import { LIST_ALL_ORGS, SAVE_ORG } from "../actions/OrganizationAction";
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage';
/**
 * Nessa classe que de fato ocorre a chamada ao seu backend.
 * Tenha em mente que o dispatcher vai chamar o metodo reduce dessa classe
 * sempre que vc der um dispatch. 
 * O que faz ele chamar o metodo certo e o type.
 * Voce compara o type e manda o cara para o metodo certo ou simplemente nao faz nada.
 * Sempre que vc chamar um metodo via reduce, vc deve invocar os listeners adequadamente.
 * 
 * Isso traz tipo um super porder para sua aplicacao, e e aqui que vc ganha.
 * 
 * Com uma simples chamada de um dispatcher, todas suas stores sao invocadas, todos os metodos
 * reduce sao chamados e todos os listeners sao invocados. 
 * 
 * Uma vez que suas views estejam registradas nos listeners, elas serao notificadas que uma mudanca de estado
 * ocorreu e receberao o estado novo por parametro no listenerEvent que vc deve passar no payload.
 * Da uma olhada no OrganizationPage.js no metodo onOrganizationStoreChanged.
 * 
 * 
 */
class OrganizationStore extends Store{
    reduce(type, payload){
        if(type===LIST_ALL_ORGS){
            this.listAllOrganizations(type, payload);
        }
        if(type===SAVE_ORG){
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

    listAllOrganizations(type, payload){
        let instance = this;
        fetch('/api/organization/allByUser', {
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
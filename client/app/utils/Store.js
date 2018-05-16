/**
 * @info#6
 * Este cara e uma base para suas stores.
 * Ele deve receber o dispatcher por parametro no construtor, 
 * assim e garantido que a store so sera construida mediante uma instancia
 * de dispacher e isso obriga o dispacher a existir primeiro.
 * Esse cara e a implementacao de um listener tbm.
 * 
 */
class Store{
    constructor(dispatcher){
        if(typeof dispatcher === 'undefined'){
            throw new DOMException('Voce precisa de um dispacher pra construir uma store mate!');
        }
        this.events = [];
    }

    reduce(type, payload){}

    addListener(fn){
       this.events.push(fn); 
    }

    invokeListeners(type, payload){
        console.log(type);
        this.events.forEach((event)=>{
            if(typeof event === 'function'){
                event(type, payload);
            }
        });
    }
}

export default Store;
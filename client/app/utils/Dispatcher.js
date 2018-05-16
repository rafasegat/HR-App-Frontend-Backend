let instance = null;
/**
 * @info#3
 * Esse cara e um singleton. 
 * Ele vai centralizar todas as instancias das suas stores e despachar os eventos
 * para suas stores. Isso constiue um contexto reativo para todas as stores que estejam
 * registradas nele.
 * 
 * Vc nao precisa mexer nele, so usar. It is one gift!! :)
 * 
 */
class Dispatcher{
    constructor(){}

    static getInstance(){
        if(instance === null){
            instance = new Dispatcher();
            instance.stores = new Map();
        }
        return instance;
    }

    registerStore(key, store){
        instance.stores.set(key,store);
    }

    getStore(name){
        return instance.stores.get(name);
    }

    dispatch(type, payload){
        instance.stores.forEach((value, key) => {
            if(typeof value.reduce === 'function'){
                value.reduce(type, payload);
            }
        });
    }
}
export default Dispatcher.getInstance;
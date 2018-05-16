import Dispatcher from "../utils/Dispatcher";

/**
 * @info#2
 * Criei esse cara so de exemplo. Veja que nao tem lib nem nada nele, e so um monte de function e contraints
 * 
 * 
 */
export default {
    listAll:function(payload){
        //@info#10 uma vez invocado esse cara, o seu listener dentro da sua *Page vai ser chamado.
        Dispatcher().dispatch(LIST_ALL_ORGS, payload);
    },
    addListener(fn){
        Dispatcher().getStore('OrganizationStore').addListener(fn);
    },
    save:function(payload){
        Dispatcher().dispatch(SAVE_ORG, payload);
    }
}

export const LIST_ALL_ORGS = 'list-all-organizations';
export const SAVE_ORG = 'save-organization';
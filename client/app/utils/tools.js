import { getFromStorage, setInStorage } from './storage';


export function isLogged(){
    const obj = getFromStorage('feedback360');
    if (obj && obj.token)
        return true;
    else
        return false;
}
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// This function transform Object Stringfied to first element without Double Quotation -> Ex. {"name": "Joe"} -> {name: "Joe"}
export function formatInput(input){
    return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g,"$1:");
}

export function refreshModel(currentInstance){
    const { 
        modelCurrentDefault
    } = currentInstance.state;
    let aux = {};
    for(var prop in modelCurrentDefault)
        aux[prop] = modelCurrentDefault[prop];

    if(!aux['id']) aux['id'] = -1;

    currentInstance.setState({ 
        modelCurrent: aux 
    });
    console.log(currentInstance.state.modelCurrent)
}

const Organization = require('../models/Organization');
const Tools = require('../common/tools');

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;
    
    if(data.id == -1) delete data.id;

    if(data.id > 0){
        Organization
        .query()
        .update(data)
        .where({
            id: data.id
        })
        .then( json => {
            if(!json.id) return res.send({ status: 'Error: Organization Not Updated.' });
            return res.send({ status: 'success' });
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    } else {
        Organization
        .query()
        .insert(data)
        .then( json => {
            if(!json.id) return res.send({ status: 'Error: Organization Not added.' });
            return res.send({ status: 'success' });
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
}
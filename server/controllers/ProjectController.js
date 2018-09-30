
const Project = require('../models/Project');
const Tools = require('../common/tools');

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;
    
    if(data.id > 0){
        Project
        .query()
        .update(data)
        .where({
            id: data.id
        })
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Project Not Updated.' });

            return res.send({ status: 'success' });
                
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    } else {
        Project
        .query()
        .insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Project Not added.' });

            return res.send({ status: 'success' });
                
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
}
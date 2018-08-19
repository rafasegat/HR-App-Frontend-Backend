const OrganizationController = require('./controllers/OrganizationCtrl');
const OrganizationModel = require('../models/Organization');

module.exports.graphql_root = {
    organization: () => {
        //return [{id: 1, name: 'nfjnff'}, {id: 2, name: 'sssss'}];
        var data = [];
        OrganizationModel
        .query()
        .where('id_user', 3)
        .then( results => {
            // results.forEach( (result) => { 
            //     data.push(result);
            // });
            return [{id: 1, name: 'nfjnff'}, {id: 2, name: 'sssss'}];
            //return data;
        })
        .catch( err => {
            console.log(err)
            return { status: "Error 500: "+err };
        });
    },
    message: () => {
        return 'Hello World!';
    }
};
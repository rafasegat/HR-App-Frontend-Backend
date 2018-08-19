
const ProjectModel = require('../../models/Project');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
    return ProjectModel
    .query()
    .where('id_organization', args.id_organization)
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    
    if (!data.name)
        return res.send({ success: false, message: 'Error: Name cannot be blank.' });

    if(data.id){
        // Update
    } else {
        Organization.query().insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: "Not added.", data: json });
            
                return res.send({ status: 'success', data: json });

        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
  }

const Project = require('../models/Project');
const Tools = require('../common/tools');

exports.all = (req, res, next) => {
    const { body } = req;
    const { id_organization } = body;
    
    if(!id_organization)
      return res.send({ status: "Error: Organization required." });
    
    Project
      .query()
      .where('id_organization', id_organization)
      .then( projects => {
        if(projects.length == 0)
          return res.send({ status: "No Projects.", data: projects });

        return res.send({ status: 'success', data: projects });

      })
      .catch( err => {
        return res.status(500).send({ status: err });
      });

  };

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    
    if (!data.name)
        return res.send({ status: 'Error: Name cannot be blank.' });

    if(data.id){
        // Update
    } else {
        Project.query().insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Not added.' });
            
            return res.send({ status: 'success' });
        })
        .catch( err => {
            return res.status(500).send({ status: err });
        });
    }
}
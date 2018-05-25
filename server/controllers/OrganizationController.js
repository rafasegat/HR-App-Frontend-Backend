
const Organization = require('../models/Organization');
const Tools = require('../common/tools');

exports.all = (req, res, next) => {
    const { body } = req;
    const { id_user } = body;
    
    if(!id_user)
        return res.send({ status: "Error: User required." });

    Organization
      .query()
      .where('id_user', id_user)
      .then( organizations => {
        if(organizations.length == 0)
          return res.send({ status: "No organizations.", data: organizations });

        return res.send({ status: 'success', data: organizations });

      })
      .catch( err => {
          console.log(err)
        return res.status(500).send({ status: "Error 500: "+err });
      });

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
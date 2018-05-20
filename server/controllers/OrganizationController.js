
const Organization = require('../models/Organization');
const Tools = require('../common/tools');

exports.all = (req, res, next) => {
    const { body } = req;
    const { user } = body;
    
    if(!user)
      return res.send({ success: false,  message: "User required." });
    
    Organization
      .query()
      .where('id_user', user)
      .then( organizations => {
        if(organizations.length == 0)
          return res.send({ success: false, message: "No organizations." });

        return res.send({
          success: true,
          data: organizations
        });

      })
      .catch( err => {
        return res.status(500).send({ 
          success: false,
          message: err
        });
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
                return res.send({ success: false, message: "Error: Not added." });
            
            return res.send({ success: true, message: "Added!" });
        })
        .catch( err => {
            return res.status(500).send({ success: false, message: err });
        });
    }
  }
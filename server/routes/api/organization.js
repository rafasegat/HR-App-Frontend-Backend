const Organization = require('../../models/Organization');
const OrganizationController = require('../../controllers/OrganizationController');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  app.post('/api/organization/all', OrganizationController.all);
  
  /*
   * New organization
   */
  app.post('/api/organization/save', (req, res, next) => {
    
    const { body } = req;
    const { data } = body;
    
    if (!data.name) {
      return res.send({
        success: false,
        message: 'Error: Name cannot be blank.'
      });
    }

    if(data.id){
      // Update
    } else {
      Organization
        .query()
        .insert(data)
        .then( json => {
          if(!json.id){
            return res.send({
              success: false,
              message: "Error: Not added."
            });
          } 
          return res.send({
            success: true,
            message: "Added!"
          });
        })
        .catch( err => {
          return res.status(500).send({ 
            success: false,
            message: err
          });
        });
    }
    
    
  });

};
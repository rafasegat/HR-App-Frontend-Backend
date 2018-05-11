const Organization = require('../../models/Organization');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  /*
   * New organization
   */
  app.post('/api/account/new', (req, res, next) => {
    
    const { body } = req;
    const { name } = body;
    let { user } = body;
    
    if (!name) {
      return res.send({
        success: false,
        message: 'Error: Name cannot be blank.'
      });
    }
    if (!user) {
      return res.send({
        success: false,
        message: 'Error: User cannot be blank.'
      });
    }
    
  });

  /*
   * Get all organizations by user
   */
  app.post('/api/organization/allByUser', (req, res, next) => {
    
    const { body } = req;
    const { user } = body;
    
    Organization
      .query()
      .where('id_user', user)
      .then( organizations => {
        if(organizations.length != 1){
          return res.send({
            success: false,
            message: 'No organizations;'
          });
        } 
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

  });

};
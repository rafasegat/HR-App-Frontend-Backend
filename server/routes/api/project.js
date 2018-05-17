const Project = require('../../models/Project');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  /*
   * New project
   */
  app.post('/api/project/save', (req, res, next) => {
    
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
      Project
        .query()
        .insert(data)
        .then( json => {
          if(!json.id) return res.send({ success: false, message: "Error: Not added." });
          
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

  /*
   * Get all projects by user
   */
  app.post('/api/project/all', (req, res, next) => {
    
    const { body } = req;
    const { user } = body;
    
    if(!user){
      return res.send({ 
        success: false,
        message: "User required."
      });
    }
    
    Project
      .query()
      .where('id_user', user)
      .then( projects => {
        if(projects.length == 0){
          return res.send({
            success: false,
            message: "No projects."
          });
        } 
        return res.send({
          success: true,
          data: projects
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
const ProjectController = require('../../controllers/ProjectController');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  app.post('/api/project/all', ProjectController.all);
  app.post('/api/project/save', ProjectController.save);

};
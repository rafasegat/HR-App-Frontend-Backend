const ParticipantController = require('../../controllers/ParticipantController');
const OrganizationController = require('../../controllers/OrganizationController');
const ProjectController = require('../../controllers/ProjectController');
const ProviderController = require('../../controllers/ProviderController');
const Tools = require('../../common/tools');


module.exports = (app) => {
  
  //Organizations
  app.post('/api/organization/save', OrganizationController.save);

  // Project
  app.post('/api/project/save', ProjectController.save);

  // Participants
  app.post('/api/participant/save', ParticipantController.save);

  // Provider
  app.post('/api/provider/save', ProviderController.save);
  app.post('/api/provider/delete', ProviderController.delete);

};
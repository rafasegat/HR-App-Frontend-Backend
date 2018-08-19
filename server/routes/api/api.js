const ParticipantController = require('../../controllers/ParticipantController');
const OrganizationController = require('../../controllers/OrganizationController');
const ProjectController = require('../../controllers/ProjectController');
const ProviderController = require('../../controllers/ProviderController');
const Tools = require('../../common/tools');


module.exports = (app) => {
  
  //Organizations
  app.post('/api/organization/all', OrganizationController.all);
  app.post('/api/organization/save', OrganizationController.save);

  // Participants
  app.post('/api/participant/all', ParticipantController.all);
  app.post('/api/participant/save', ParticipantController.save);
  app.post('/api/participant/providers', ParticipantController.providers);

  // Project
  app.post('/api/project/all', ProjectController.all);
  app.post('/api/project/save', ProjectController.save);

  // Provider
  app.post('/api/provider/all', ProviderController.all);
  app.post('/api/provider/save', ProviderController.save);

};
const UserController = require('../../controllers/UserController');
const ParticipantController = require('../../controllers/ParticipantController');
const OrganizationController = require('../../controllers/OrganizationController');
const ProjectController = require('../../controllers/ProjectController');
const ProviderController = require('../../controllers/ProviderController');
const ProviderCustomerController = require('../../controllers/ProviderCustomerController');
const ProviderCustomerOrganizationController = require('../../controllers/ProviderCustomerOrganizationController');

module.exports = (app) => {
  
  // User
  app.get('/account/verify', UserController.verify);
  app.post('/account/signin', UserController.signin);

  //Organizations
  app.post('/api/organization/save', OrganizationController.save);

  // Project
  app.post('/api/project/save', ProjectController.save);

  // Participants
  app.post('/api/participant/save', ParticipantController.save);

  // Provider
  app.post('/api/provider/save', ProviderController.save);
  app.post('/api/provider/delete', ProviderController.delete);

  // Provider Customer
  app.post('/api/provider-customer/save', ProviderCustomerController.save);
  app.post('/api/provider-customer/delete', ProviderCustomerController.delete);

  // Provider Customer Organization
  app.post('/api/provider-customer-organization/save', ProviderCustomerOrganizationController.save);
  app.post('/api/provider-customer-organization/delete', ProviderCustomerOrganizationController.delete);

};
const Organization = require('../../models/Organization');
const OrganizationController = require('../../controllers/OrganizationController');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  app.post('/api/organization/all', OrganizationController.all);
  app.post('/api/organization/save', OrganizationController.save);

};
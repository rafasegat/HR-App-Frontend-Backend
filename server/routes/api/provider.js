const Provider = require('../../models/Provider');
const ProviderController = require('../../controllers/ProviderController');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  app.post('/api/provider/all', ProviderController.all);
  app.post('/api/provider/save', ProviderController.save);

};
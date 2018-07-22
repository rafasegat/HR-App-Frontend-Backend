const ParticipantController = require('../../controllers/ParticipantController');
const Tools = require('../../common/tools');

module.exports = (app) => {
  
  app.post('/api/participant/all', ParticipantController.all);
  app.post('/api/participant/save', ParticipantController.save);
  app.post('/api/participant/providers', ParticipantController.providers);

};
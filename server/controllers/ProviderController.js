const Provider = require('../models/Provider');
const Tools = require('../common/tools');

exports.all = (req, res, next) => {
    const { body } = req;
    const { id_project } = body;
    
    if(!id_project)
      return res.send({ status: "Error: Project required." });
    
      ProjectParticipant
      .query()
      .select('a.*')
      .join('participant as a', 'a.id', 'project_participant.id_participant')
      .where('id_project', id_project)
      .then( participants => {
        if(participants.length == 0)
          return res.send({ status: "No Participants.", data: participants });

        return res.send({ status: 'success', data: participants });

      })
      .catch( err => {
        return res.status(500).send({ status: "Error 500: "+err });
      });
};


exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;

    if(data.id){
        // Update
    } else {
        Provider
        .query()
        .insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Participant Not added.' });

            return res.send({ status: 'success' });
                
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
}
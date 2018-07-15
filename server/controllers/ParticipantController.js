const Participant = require('../models/Participant');
const ProjectParticipant = require('../models/Project_Participant');
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
        Participant
        .query()
        .insert(data)
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Not added.' });
            
            // All good, now lets add row to ProjectParticipant as well
            let data_proj_part = {
                id_project: param.id_project,
                id_participant: json.id
            }

            ProjectParticipant
            .query()
            .insert(data_proj_part)
            .then( json => {
                if(!json.id)
                    return res.send({ status: 'Error: Not added.' });

                return res.send({ status: 'success' });
            })
            .catch( err => {
                return res.status(500).send({ status: "Error 500: "+err });
            });
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    }
}
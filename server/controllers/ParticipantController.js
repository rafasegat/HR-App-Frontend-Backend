const Participant = require('../models/Participant');
const ProjectParticipant = require('../models/Project_Participant');
const Provider = require('../models/Provider');
const Tools = require('../common/tools');

// exports.all = (req, res, next) => {
//     const { body } = req;
//     const { id_project } = body;
    
//     if(!id_project)
//       return res.send({ status: "Error: Project required." });
    
//     ProjectParticipant
//       .query()
//       .select('a.*')
//       .join('participant as a', 'a.id', 'project_participant.id_participant')
//       .where('id_project', id_project)
//       .then( participants => {
//         if(participants.length == 0)
//           return res.send({ status: "No Participants.", data: participants });

//         return res.send({ status: 'success', data: participants });

//     }).catch( err => {
//         return res.status(500).send({ status: "Error 500: "+err });
//     });
// };

// exports.providers = (req, res, next) => {
//     const { body } = req;
//     const { id_participant } = body;
//     const { id_project } = body;
    
//     if(!id_participant || !id_project)
//       return res.send({ status: "Error: Participant or Project params required." });
    
//       Provider
//       .query()
//       .select('provider.relationship as provider_relationship', 'provider.status as provider_status', 'a.*')
//       .join('participant as a', 'a.id', 'provider.id_participant')
//       .where({
//                 id_participant: id_participant,
//                 id_project: id_project
//       })
//       .then( providers => {
//         if(providers.length == 0)
//           return res.send({ status: "No Providers.", data: providers });

//         return res.send({ status: 'success', data: providers });

//       })
//       .catch( err => {
//         return res.status(500).send({ status: "Error 500: "+err });
//       });
// };

exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;

    if(data.id){ 
        Participant
        .query()
        .update(data)
        .where({
            id: data.id
        })
        .then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Participant Not Updated.' });

            return res.send({ status: 'success' });
                
        })
        .catch( err => {
            return res.status(500).send({ status: "Error 500: "+err });
        });
    } else {
        Participant
        .query()
        .insert(data)
        .then( json => {
            
            if(!json.id)
                return res.send({ status: 'Error: Participant Not added.' });
            
            let id_participant = json.id,
                id_project = param.id_project;

            // All good, now lets ADD row to ProjectParticipant as well
            let data_proj_part = {
                id_project: id_project,
                id_participant: id_participant
            }
            ProjectParticipant
            .query()
            .insert(data_proj_part)
            .then( json => {
                if(!json.id) return res.send({ status: 'Error: ProjectParticipant Not added.' });
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
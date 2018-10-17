const Participant = require('../models/Participant');
const ProjectParticipant = require('../models/Project_Participant');
const Provider = require('../models/Provider');
const Tools = require('../common/tools');


exports.save = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;

    if(data.id == -1) delete data.id;
    
    if(data.id){ 
        Participant
        .query().update(data).where({
            id: data.id
        }).then( json => {
            if(!json.id) return res.send({ status: 'Error: Participant Not Updated.' });
            return res.send({ status: 'success' });
        }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });
    } else {
        Participant.query().insert(data).then( json => {
            if(!json.id)
                return res.send({ status: 'Error: Participant Not added.' });

            let id_participant = json.id,
                id_project = param.id_project;

            // All good, now lets ADD row to ProjectParticipant as well
            let data_proj_part = {
                id_project: id_project,
                id_participant: id_participant
            }
            ProjectParticipant.query().insert(data_proj_part).then( json => {
                if(!json.id) return res.send({ status: 'Error: ProjectParticipant Not added.' });
                return res.send({ status: 'success' });
            
            }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });
        }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });
    }
}

exports.delete = (req, res, next) => {
    const { body } = req;
    const { data } = body;
    const { param } = body;

    Provider.query().where({
        id_project: data.id_project,
        id_participant: data.id_participant,
    }).delete().then( json => {

        Provider.query().where({
            id_project: data.id_project,
            id_provider: data.id_participant,
        }).delete().then( json => {

            // Delete at Project Participant
            ProjectParticipant.query().where({
                id_project: data.id_project,
                id_participant: data.id_participant,
            })
            .delete().then( json => {

                // Delete at Participant
                Participant.query().where({
                    id: data.id_participant
                })
                .delete().then( json => {

                    return res.send({ status: 'success' });

                }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });

            }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });
        
        }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });
        
    }).catch( err => { return res.status(500).send({ status: "Error 500: "+err }); });
}

const ParticipantModel = require('../../models/Project');
const ProjectParticipantModel = require('../../models/Project_Participant');
const ProviderModel = require('../../models/Provider');
const Tools = require('../../common/tools');
const { raw } = require('objection');

exports.getAll = (args) => {
    return ProjectParticipantModel
    .query()
    .select('a.*')
    .join('participant as a', 'a.id', 'project_participant.id_participant')
    .where('id_project', args.id_project)
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

exports.getAllLessCurrent = (args) => {
    return ProjectParticipantModel
    .query()
    .select('a.*')
    .join('participant as a', 'a.id', 'project_participant.id_participant')
    .where({
        'id_project': args.id_project
    })
    .whereNot({
        'a.id': args.id_participant
    })
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

exports.getParticipantTasks = (args) => {
    return ProviderModel
    .query()
    .select(
        'a.name as name_participant_feedback_receiver',
        'a.email as email_participant_feedback_receiver',
        'a.position as position_participant_feedback_receiver',
        'provider.status as status',
        'provider.relationship as relationship_participant_feedback_receiver'
    )
    .join('participant as a', 'a.id', 'provider.id_participant')
    .where({
        'id_project': args.id_project,
        'provider.id_provider': args.id_participant
    })
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

exports.getProvidersByParticipant = (args) => {
    return ProviderModel
      .query()
      .select( 
        'provider.id as id',
        'provider.id_provider as id_provider',
        raw('if(??=5 or ??=6, ??, ??) as ??', ['provider.relationship', 'provider.relationship', 'b.name', 'a.name', 'name']),
        raw('if(??=5 or ??=6, ??, ??) as ??', ['provider.relationship', 'provider.relationship', 'b.email', 'a.email', 'email']),
        raw('if(??=5 or ??=6, "External Customer/Supplier", ??) as ??', ['provider.relationship', 'provider.relationship', 'a.position', 'position']),
        'provider.status as status',
        'provider.relationship as relationship'
      )
      .leftJoin('participant as a', 'a.id', 'provider.id_provider')
      .leftJoin('provider_customer as b', 'b.id', 'provider.id_provider_customer')
      .where({
                id_participant: args.id_participant,
                id_project: args.id_project
      }).then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });
}
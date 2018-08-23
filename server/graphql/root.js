const OrganizationCtrl = require('./controllers/OrganizationCtrl');
const ProjectCtrl = require('./controllers/ProjectCtrl');
const ParticipantCtrl = require('./controllers/ParticipantCtrl');
const OrganizationModel = require('../models/Organization');
var async = require("async");

module.exports.graphql_root = {

    // Organizations
    organizations: (args) => {
        return OrganizationCtrl.getAll(args);
    },

    // Projects
    projects: (args) => {
        return ProjectCtrl.getAll(args);
    },

    // Participants
    participants: (args) => {
        return ParticipantCtrl.getAll(args);
    },
    participantsLessCurrent: (args) => {
        return ParticipantCtrl.getAllLessCurrent(args);
    },

    // Providers
    providersByParticipant: (args) => {
        return ParticipantCtrl.getProvidersByParticipant(args);
    }

};
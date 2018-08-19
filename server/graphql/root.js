const OrganizationCtrl = require('./controllers/OrganizationCtrl');
const ProjectCtrl = require('./controllers/ProjectCtrl');
const OrganizationModel = require('../models/Organization');

module.exports.graphql_root = {
    organizations: (args) => {
        return OrganizationCtrl.getAll(args);
    },
    projects: (args) => {
        return ProjectCtrl.getAll(args);
    },
};
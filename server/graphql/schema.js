const { buildSchema } = require('graphql');

module.exports.graphql_schema = buildSchema(`
    type Organization {
        id: Int
        name: String
    },
    type Query {
        organization: [Organization]
    }
`);
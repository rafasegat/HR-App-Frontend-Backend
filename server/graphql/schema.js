const { buildSchema } = require('graphql');

module.exports.graphql_schema = buildSchema(`
    
    type Organization {
        id: Int!
        name: String!
        id_user: Int!
        status: Int
        created_at: String
        updated_at: String
    },
    input OrganizationInput {
        name: String!
        id_user: Int!
        status: Int
    },

    type Project {
        id: Int!
        name: String!
        id_organization: Int!
        status: Int
        created_at: String
        updated_at: String
    },

    type Query {
        organizations(id_user: ID!): [Organization]
        projects(id_organization: ID!): [Project]
        organization: Organization
    }

    type Mutation {
        createOrganization(input: OrganizationInput): Organization
      }

`);
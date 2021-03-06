const { buildSchema } = require('graphql');

module.exports.graphql_schema = buildSchema(`

    input OrganizationInput {
        name: String!
        id_user: Int!
        status: Int
    },
    type Organization {
        id: Int!
        name: String!
        id_user: Int!
        status: Int
        created_at: String
        updated_at: String
    },

    type Project {
        id: Int!
        name: String!
        id_organization: Int!
        status: Int
        created_at: String
        updated_at: String
    },

    type Participant {
        id: Int!
        name: String!
        email: String
        position: String
        status: Int
        self_assessment: Int
        choose_own_feedback_provider: Int
        feedback_provider_needs_approval: Int
        id_participant_feedback_reviewer: Int
    }

    type ParticipantTasks {
        name_participant_feedback_receiver: String, 
        email_participant_feedback_receiver: String,
        position_participant_feedback_receiver: String, 
        status: Int,
        relationship_participant_feedback_receiver: Int
    }

    type Provider {
        id: Int
        id_provider: Int
        name: String!
        email: String!
        position: String
        status: Int
        relationship: Int
        id_provider_customer: Int
    }

    type ProviderCustomer {
        id: Int!
        name: String!
        email: String
        id_provider_customer_organization: Int!
        organization_name: String
    }

    type ProviderCustomerOrganization {
        id: Int!
        name: String!
        id_organization: Int
    }

    type Survey {
        id: Int!
        name: String!
    }

    type Query {

        organizations(id_user: ID!): [Organization]

        projects(id_organization: ID!): [Project]

        participants(id_project: ID!): [Participant]

        participantsLessCurrent(id_project: ID!, id_participant: ID!): [Participant]

        participantTasks(id_project: ID!, id_participant: ID!): [ParticipantTasks]

        providersByParticipant(id_participant: ID!, id_project: ID!): [Provider]

        provider_customers(id_organization: ID!): [ProviderCustomer]

        provider_customer_organization(id_organization: ID!): [ProviderCustomerOrganization]

        surveys(id_organization: ID!): [Survey]

    }

    

`);

// type Mutation {
//     createOrganization(input: OrganizationInput): Organization
// }
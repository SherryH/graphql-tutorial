import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

// "!" denotes a required field
// "[]" means this is a list of channels
// # A mutation to add a new channel to the list of channels
const typeDefs = `

type Channel {
    id: ID!
    name: String
}

type Query {
    channels: [Channel]
}

type Mutation {
    addChannel(name: String!): Channel
}

`;
//turns data types into executable schema for graphql server
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
// Add mocks, modifies schema in place
// addMockFunctionsToSchema({ schema });

export { schema };

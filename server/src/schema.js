import {
    makeExecutableSchema,
    addMockFunctionsToSchema
} from 'graphql-tools';
import { resolvers } from './resolvers'

const typeDefs = `

type Channel {
    id: ID!
    name: String
}

type Query {
    channels: [Channel] 
}

`;
//turns data types into executable schema for graphql server
const schema = makeExecutableSchema({
    typeDefs, resolvers
});
// Add mocks, modifies schema in place
// addMockFunctionsToSchema({ schema });

export { schema };
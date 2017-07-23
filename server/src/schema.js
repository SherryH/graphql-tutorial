import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
  messages: [Message]!
}

type Message {
  id: ID
  text: String
}

# Define Input Type. Mutation Input param might be the same across few operations like Create/ Update

Input MessageInput {
  channelId: ID
  text: String
}

# This type specifies the entry points into our API
type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  channel(id: ID!): Channel
}

# The mutation root type, used to define all mutations
type Mutation {
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

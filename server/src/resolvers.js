//hardcode some data for now
const channels = [
  {
    id: 0,
    name: 'soccer'
  },
  {
    id: 1,
    name: 'baseball'
  }
];

//resolvers grouped in an object
// Query resolver for resolving incoming queries
//similar structure to our data schema. this will be used in schema.js
// Resolver doc:
// http://dev.apollodata.com/tools/graphql-tools/resolvers.html
let channelId = 2;
export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = {
        id: channelId++,
        name: args.name
      };
      channels.push(newChannel);
      return newChannel;
    }
  }
};

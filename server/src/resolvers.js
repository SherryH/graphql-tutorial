//hardcode some data for now
const channels = [{
    id: 0,
    name: 'soccer'
}, {
    id: 1,
    name: 'baseball'
}];

//resolvers grouped in an object
// Query resolver for resolving incoming queries
//similar structure to our data schema. this will be used in schema.js
export const resolvers = {
    Query: {
        channels: () => {
            return channels;
        }
    }
};
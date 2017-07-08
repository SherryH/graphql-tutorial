//graphql type definition
//speficies 
// 1. the object types and fields in the App
// 2. the entry point to graphql API (Query)

//http://graphql.org/learn/schema/#scalar-types
const typeDefs = `

type Channel {
    id: ID!
    name: String
}

type Query {
    channels: [Channel] 
}

`;
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema } from './src/schema';

const PORT = 4000;

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

server.use('*', cors(corsOptions));

//Express passes requests thru graphqlExpress middleware, which executes queries against schema
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);

import React, { Component } from 'react';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
//import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

//const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

//added 500ms latency to simlate slow network
//use middleware to create latency - http://dev.apollodata.com/core/network.html
networkInterface.use([{
  applyMiddleware(req, next){
    setTimeout(next, 500);
    // next(); // next is executed 500ms later
  }
}]);

const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

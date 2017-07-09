import React, { Component } from 'react';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema'
import logo from './logo.svg';
import './App.css';


//the query for returning data with structure defined in schema.js
const channelListQuery = gql`
query ChannelListQuery {
  channels {
    id
    name
  }
}
`;
//let user know when component is loading or has errors
const ChannelsList = ({ data: { error, loading, channels } }) => {
  if (loading) {
    return (
      <p>Loading...</p>
    );
  }
  if (error) {
    //check if error.message exists
    return (
      <p>{error.message} </p>
    );
  }
  return (
    <ul className="Item-list App-intro">
      <li>Channel 1</li>
      <li>Channel 2</li>
      {channels.map(channel => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>
  );
};

//the data/error/loading status returned from graphql is in props.data
const ChannelsListWithData = graphql(channelListQuery)(ChannelsList);

//create mock server
//  create a graphql schema on the server
const schema = makeExecutableSchema({
  typeDefs
});
// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
//configure how query is sent over http or replace the whole network to sth custom
const client = new ApolloClient({ networkInterface: mockNetworkInterface });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}


export default App;

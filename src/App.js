import React, { Component } from 'react';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient();

//the query for returning data with structure defined in schema.js
const channelListQuery = gql`
query ChannelListQuery {
  channels {
    id
    name
  }
}
`;

const ChannelsList = () => {
  return (
    <ul className="Item-list App-intro">
      <li>Channel 1</li>
      <li>Channel 2</li>
    </ul>
  );
};

const ChannelsListWithData = graphql(channelListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Apollo</h2>
        </div>
        <ChannelsList />
      </div>
    );
  }
}


export default App;

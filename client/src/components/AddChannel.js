import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery } from './ChannelsListWithData';

// Define component
// instead of using refetch refetchQueries: [{ query: channelsListQuery }]
//use update to read updated data from cache
const AddChannel = ({ mutate }) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      e.persist();
      //mutate is a promise, seen from https://github.com/apollographql/react-apollo/blob/master/src/graphql.tsx
      mutate({
        variables: { name: e.target.value },
        optimisticResponse: {
          addChannel: {
            id: Math.round(Math.random() * -10000),
            name: e.target.value,
            __typename: 'Channel'
          }
        },
        update: (proxy, { data: { addChannel } }) => {
          //read data from our cache using channelsListQuery
          const data = proxy.readQuery({ query: channelsListQuery });
          //add mutation data to the read data
          //the data read from query is saved in the 'data' obj
          data.channels.push(addChannel);
          //writeQuery to display updated data using ChannelListQuery
          proxy.writeQuery({ query: channelsListQuery, data });
        }
      });
      e.target.value = '';
    }
  };

  return (
    <div>
      <input placeholder="Input channel name" onKeyDown={handleKeyDown} />
    </div>
  );
};

// Define mutation query
const addChannelQuery = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

//combine query with component to enable graphql mutation
const addChannelWithMutation = graphql(addChannelQuery)(AddChannel);

export default addChannelWithMutation;

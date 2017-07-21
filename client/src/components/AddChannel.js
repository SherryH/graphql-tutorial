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
      mutate({
        variables: { name: e.target.value },
        update: (proxy, { data: { addChannel } }) => {
          //read data from our cache using channelsListQuery
          const data = proxy.readQuery({ query: channelsListQuery });
          //add mutation data to the read data
          //the data read from query is saved in the 'data' obj
          data.channels.push(addChannel);
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

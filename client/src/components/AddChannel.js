import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery } from './ChannelsListWithData';

// Define component
const AddChannel = ({ mutate }) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      e.persist();
      mutate({
        variables: { name: e.target.value },
        refetchQueries: [{ query: channelsListQuery }]
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

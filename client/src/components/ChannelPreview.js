import React from 'react';
import { gql, graphql } from 'react-apollo';

const ChannelPreview = ({ data: { loading, error, channel } }) => {
  //let channel = { name: "Stub Name"}

  if (error) {
    return (
      <p style={{ color: 'white' }}>
        {error.message}
      </p>
    );
  }

  return (
    <div>
      <div className="channelName">
        {channel ? channel.name : 'loading'}
      </div>
      <div style={{ color: 'white' }}>Loading Messages</div>
    </div>
  );
};

const channelQuery = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

export default graphql(channelQuery, {
  options: ({ channelId }) => ({
    variables: {
      channelId
    }
  })
})(ChannelPreview);

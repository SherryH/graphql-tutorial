import React from 'react';
import { gql, graphql } from 'react-apollo';

const ChannelPreview = ({ data: { loading, error, channel } }) => {
  //let channel = { name: "Stub Name"}

  return (
    <div>
      <div className="channelName">
        {channel ? channel.name : loading}
      </div>
      <div>Loading Messages</div>
    </div>
  );
};

const channelQuery = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelID) {
      id
      name
    }
  }
`;

export default ChannelPreview;

import React from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';

import { gql, graphql } from 'react-apollo';

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

//the channel details view should display name and messages
const ChannelDetails = ({ data: { loading, error, channel } }) => {
  // let messages = [{ id: '1', text: 'Stub Message - To Replace' }];
  // let name = 'Stub Name';
  // let channel = { name, messages };
  console.log('channel', channel);

  if (loading) {
    return <ChannelPreview channelId={channel.id} />;
  }
  if (error) {
    return <p>Error</p>;
  }
  if (channel === null) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="channelName">
        {channel.name}
      </div>
      <MessageList messages={channel.messages} />
    </div>
  );
};
export default graphql(channelDetailsQuery, {
  options: props => ({ variables: { channelId: props.match.params.channelId } })
})(ChannelDetails);

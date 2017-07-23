import React from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';

import { gql, graphql } from 'react-apollo';

export const ChannelDetailsQuery = gql`
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

//data loading, error, message and channel list

//the channel details view should display name and messages
const ChannelDetails = ({ data: { loading, error, channel } }) => {
  let messages = [{ id: '1', text: 'Stub Message - To Replace' }];
  let name = 'Stub Name';
  // let channel = { name, messages };

  if (loading) {
    return <p>Loading</p>;
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
const props = ChannelDetails.props;
export default graphql(ChannelDetailsQuery, {
  options: props => ({ variables: { channelId: props.match.params.channelId } })
})(ChannelDetails);

import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelDetailsQuery } from './ChannelDetails';
import { withRouter } from 'react-router';

const addMessageMutation = gql`
  mutation addMessageMutation($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

const AddMessage = ({ match, mutate }) => {
  const handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      //mutation to add message, it will be triggered in this handler
      mutate({
        variables: {
          message: {
            channelId: match.params.channelId,
            text: evt.target.value
          }
        },
        optimisticResponse: {
          addMessage: {
            id: Math.round(Math.random() * -10000),
            text: evt.target.value,
            __typename: 'Message'
          }
        },
        update: (proxy, { data: { addMessage } }) => {
          //the returned data is mutation name, addMessage, not addMessageQuery
          //need to supply id to channelDetailsQuery to display
          const data = proxy.readQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId
            }
          });
          data.channel.messages.push(addMessage);
          proxy.writeQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId
            },
            data
          });
        }
      });
      evt.target.value = '';
    }
  };

  return (
    <div className="messageInput">
      <input type="text" placeholder="New message" onKeyUp={handleKeyUp} />
    </div>
  );
};

export default graphql(addMessageMutation)(withRouter(AddMessage));

import { Avatar, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FujiAPI from '../../../services/API/FujiAPI';
import { authUserSelector } from '../../../services/redux/slices/authSlice/authSelectors';
import { getMessages } from '../../../services/redux/slices/chatSlice/chatReducer';
import {
  chatActiveConversationSelector,
  chatFetchedMessagesSelector,
} from '../../../services/redux/slices/chatSlice/chatSelectors';
import CommentInput from '../../inputs/CommentInput.jsx';
import Message from './Message.jsx';
import UserMessage from './UserMessage.jsx';

export default function Conversation() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => authUserSelector(state));
  const chatActiveConversation = useSelector((state) => chatActiveConversationSelector(state));
  const chatFetchedMessages = useSelector((state) => chatFetchedMessagesSelector(state));
  const messagesContainerRef = useRef();

  const handleMessageSubmit = (value) =>
    FujiAPI.chat.sendMessage({ conversation: chatActiveConversation._id, content: value });

  useEffect(() => {
    dispatch(getMessages(chatActiveConversation._id));
  }, [chatActiveConversation]);

  return (
    <div className={classes.root}>
      <div className={classes.conversationBar}>
        <Avatar className={classes.avatar} />
        <Typography>
          {chatActiveConversation.participants.filter((el) => el._id !== authUser._id)[0].name}
        </Typography>
      </div>
      {chatFetchedMessages && (
        <div className={classes.conversationContent} ref={messagesContainerRef}>
          {chatFetchedMessages.messages.map((message) => {
            if (message.author._id === authUser._id) {
              return <UserMessage content={message.content} time={message.sentAt} />;
            }
            return (
              <Message
                key={message._id}
                author={message.author._id === authUser._id ? 'You' : message.author.name}
                content={message.content}
                time={message.sentAt}
              />
            );
          })}
        </div>
      )}
      <div className={classes.conversationInput}>
        <CommentInput onSubmit={(value) => handleMessageSubmit(value)} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.background.default,
  },
  conversationBar: {
    display: 'flex',
    alignItems: 'center',
    height: 52,
    padding: theme.spacing(2),
    background: theme.palette.primary.background.paper,
    borderBottom: `1px solid ${theme.palette.primary.semi}`,
  },
  avatar: {
    marginRight: theme.spacing(2),
    height: 36,
    width: 36,
  },
  conversationContent: {
    height: 'calc(50vh - 102px)',
    padding: theme.spacing(2),
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'block',
      width: theme.spacing(1),
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#7cacdc',
      borderRadius: theme.shape.borderRadius,
    },
  },
  conversationInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderTop: `1px solid ${theme.palette.primary.semi}`,
    background: theme.palette.primary.background.paper,
    padding: theme.spacing(2),
  },
}));

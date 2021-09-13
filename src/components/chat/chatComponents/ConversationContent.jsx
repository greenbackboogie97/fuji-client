import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { authUserIDSelector } from '../../../services/redux/slices/authSlice/authSelectors';
import Message from './Message.jsx';

export default function ConversationContent(props) {
  const classes = useStyles();
  const authUserID = useSelector((state) => authUserIDSelector(state));
  const messagesEndRef = useRef();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollToBottom, [props.messages]);

  return (
    <div className={classes.root}>
      {props.messages.map((message) => {
        return (
          <>
            <Message
              key={message._id}
              author={message.from === authUserID ? 'You' : props.contactName}
              him={message.from !== authUserID}
              content={message.content}
              time={message.sentAt}
            />
            <div ref={messagesEndRef} />
          </>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(50vh - 102px)',
    padding: theme.spacing(2),
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'block',
      width: theme.spacing(1),
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.semi,
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

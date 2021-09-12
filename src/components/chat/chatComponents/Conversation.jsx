import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  activeConversationSelector,
  activeConversationStatusSelector,
} from '../../../services/redux/slices/chatSlice/chatSelectors';
import { authUserIDSelector } from '../../../services/redux/slices/authSlice/authSelectors';
import CommentInput from '../../inputs/CommentInput.jsx';
import { sendMessage } from '../../../services/socket';
import { addMessage } from '../../../services/redux/slices/chatSlice/chatReducer';
import ConversationContent from './ConversationContent.jsx';
import ConversationPlaceholder from './ConversationPlaceholder.jsx';
import ConversationLoadPlaceholder from './ConversationLoadPlaceholder.jsx';

export default function Conversation() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeConversation = useSelector((state) => activeConversationSelector(state));
  const activeConversationStatus = useSelector((state) => activeConversationStatusSelector(state));
  const authUserID = useSelector((state) => authUserIDSelector(state));

  const handleMessageSubmit = (content) => {
    sendMessage({ content, conversationID: activeConversation._id, from: authUserID });
    dispatch(
      addMessage({
        content,
        conversationID: activeConversation._id,
        from: authUserID,
        sentAt: Date.now(),
      })
    );
  };

  return (
    <div className={classes.root}>
      {(activeConversation && (
        <>
          <div className={classes.conversationBar}>
            <Avatar className={classes.avatar} />
            <Typography>
              {activeConversation.participants.filter((el) => el._id !== authUserID)[0].name}
            </Typography>
          </div>
          <ConversationContent
            messages={activeConversation.messages}
            contactName={
              activeConversation.participants.filter((el) => el._id !== authUserID)[0].name
            }
          />
          <div className={classes.conversationInput}>
            <CommentInput onSubmit={(value) => handleMessageSubmit(value)} />
          </div>
        </>
      )) ||
        (activeConversationStatus === 'pending' ? (
          <ConversationLoadPlaceholder />
        ) : (
          <ConversationPlaceholder />
        ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.background.default,
    width: 'calc(100% - 72px)',
    height: '100%',
    position: 'absolute',
    right: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  conversationBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    padding: theme.spacing(2),
    background: theme.palette.primary.background.paper,
    borderBottom: `1px solid ${theme.palette.primary.semi}`,
  },
  avatar: {
    marginRight: theme.spacing(2),
    height: 34,
    width: 34,
  },
  conversationInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderTop: `1px solid ${theme.palette.primary.semi}`,
    background: theme.palette.primary.background.paper,
    padding: theme.spacing(1),
  },
}));

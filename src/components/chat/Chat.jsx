import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ControlBar from './chatComponents/ControlBar.jsx';
import Conversation from './chatComponents/Conversation.jsx';
import { chatActiveConversationSelector } from '../../services/redux/slices/chatSlice/chatSelectors';
import {} from '../../services/redux/slices/chatSlice/chatReducer';

export default function Chat() {
  const classes = useStyles();
  const chatActiveConversation = useSelector((state) => chatActiveConversationSelector(state));

  return (
    <div className={classes.root}>
      <ControlBar />
      {chatActiveConversation && <Conversation />}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '800px',
    maxWidth: '96vw',
    height: '50vh',
    borderTop: `1px solid ${theme.palette.primary.semi}`,
    borderLeft: `1px solid ${theme.palette.primary.semi}`,
    borderRight: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: '4px 4px 0 0',
    display: 'flex',
  },
}));

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ControlBar from './chatComponents/ControlBar.jsx';
import Conversation from './chatComponents/Conversation.jsx';
import { cleanChatState, getContacts } from '../../services/redux/slices/chatSlice/chatReducer';
import { authUserSelector } from '../../services/redux/slices/authSlice/authSelectors';

export default function Chat() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => authUserSelector(state));

  useEffect(() => {
    dispatch(getContacts(authUser._id));

    return () => dispatch(cleanChatState());
  }, []);

  return (
    <div className={classes.root}>
      <ControlBar />
      <Conversation />
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
    position: 'relative',
    zIndex: 200,
  },
}));

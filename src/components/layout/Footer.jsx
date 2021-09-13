import React, { useState } from 'react';
import { AppBar, Button, Collapse, makeStyles, Toolbar } from '@material-ui/core';
import chatIcon from '../../static/chat.png';
import Chat from '../chat/Chat.jsx';

export default function Footer() {
  const classes = useStyles();

  const [mount, setMount] = useState();

  const handleChatClick = () => setMount(!mount);

  return (
    <>
      <div className={classes.chatBoxContainer}>
        <Collapse in={mount} unmountOnExit>
          <Chat />
        </Collapse>
      </div>
      <AppBar className={classes.root} position="relative">
        <Toolbar className={classes.toolbar} variant="dense">
          <Button
            className={classes.chatToggle}
            variant="text"
            onClick={handleChatClick}
            startIcon={<img style={{ height: 38 }} src={chatIcon} alt="chat" />}
          >
            Fuji Chat
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: '0',
    position: 'fixed',
    background: 'transparent',
  },
  toolbar: {
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.palette.primary.semi}`,
    background: theme.palette.primary.background.paper,
    padding: `0 ${theme.spacing(2)}px`,
  },
  chatToggle: {
    padding: theme.spacing(1),
    fontWeight: 800,
  },
  chatBoxContainer: {
    width: 'fit-content',
    height: 'fit-content',
    position: 'fixed',
    bottom: '48px',
    left: '2vw',
    zIndex: '200',
  },
}));

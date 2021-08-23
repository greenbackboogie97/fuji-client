import React, { useState } from 'react';
import { AppBar, Badge, Collapse, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import { IoIosChatboxes } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { authStatusSelector } from '../../services/redux/slices/authSlice/authSelectors';
import Chat from '../chat/Chat.jsx';

export default function Footer() {
  const classes = useStyles();
  const authStatus = useSelector((state) => authStatusSelector(state));
  const [mount, setMount] = useState();

  const handleChatClick = () => {
    setMount(!mount);
  };

  return (
    <>
      <div className={classes.chatBoxContainer}>
        <Collapse in={mount} unmountOnExit>
          <Chat />
        </Collapse>
      </div>

      <AppBar className={classes.root} position="relative">
        <Toolbar className={classes.toolbar} variant="dense">
          {authStatus === 'logged' ? (
            <Badge badgeContent={3} color="primary">
              <IconButton className={classes.chatToggle} onClick={handleChatClick}>
                <IoIosChatboxes />
              </IconButton>
            </Badge>
          ) : null}
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
    backdropFilter: 'blur(10px)',
  },
  chatToggle: {
    padding: theme.spacing(1),
    color: theme.palette.secondary.button,
  },
  chatBoxContainer: {
    width: 'fit-content',
    height: 'fit-content',
    position: 'fixed',
    bottom: '48px',
    left: '2vw',
    zIndex: '10',
  },
}));

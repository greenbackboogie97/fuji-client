import React, { useState } from 'react';
import { AppBar, makeStyles, Toolbar, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import Media from '../media/Media.jsx';
import FriendsButton from '../buttons/FriendsButton.jsx';
import MediaButton from '../buttons/MediaButton.jsx';

export default function ProfileBar(props) {
  const classes = useStyles();
  const [mediaOpen, setMediaOpen] = useState(false);
  const userID = useSelector((state) => state.auth.user._id);

  const handleMediaOpen = () => setMediaOpen(true);
  const handleMediaClose = () => setMediaOpen(false);

  return (
    <Grid item className={classes.root}>
      <AppBar className={classes.appBar} position="relative">
        <Toolbar className={classes.toolbar} variant="dense">
          <FriendsButton id={userID} />
          <MediaButton onClick={handleMediaOpen} />
          <Media mediaID={props.id} open={mediaOpen} onClose={handleMediaClose} />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    top: '49px',
    zIndex: '100',
    height: '48px',
  },
  appBar: {
    background: theme.palette.primary.background.paper,
    boxShadow: 'unset',
    borderBottom: `1px solid ${theme.palette.primary.semi}`,
    marginBottom: theme.spacing(5),
  },
  toolbar: {
    padding: `0 ${theme.spacing(2)}px`,
    height: '48px',
    justifyContent: 'flex-end',
  },
}));

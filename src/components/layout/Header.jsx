import React from 'react';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Button>abc</Button>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.background.paper,
    height: 100,
    width: 100,
  },
}));

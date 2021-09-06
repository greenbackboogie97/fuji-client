import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import { ReactComponent as Logo } from '../../../static/FujiMedia.svg';

export default function MediaHeader() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Logo fill="currentColor" />
      </div>
      <Divider />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    padding: theme.spacing(1),
    background: theme.palette.primary.background.paper,
  },
}));

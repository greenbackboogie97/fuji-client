import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

export default function ProfileFeed({ children }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      {children}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    overflow: 'hidden',
    zIndex: '1',
  },
}));

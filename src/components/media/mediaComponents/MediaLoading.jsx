import React from 'react';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';

export default function MediaLoading() {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <CircularProgress color="primary" />
    </Grid>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

export default function MediaPlaceholder() {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Typography className={classes.text}>No media to display.</Typography>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: '16px',
    color: theme.palette.secondary.semi,
  },
}));

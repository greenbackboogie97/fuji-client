import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

export default function Message(props) {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <div className={classes.root}>
        <Typography variant="body2" className={classes.author}>
          {props.author}
        </Typography>
        <Typography variant="body1" className={classes.content}>
          {props.content}
        </Typography>
        <Typography variant="body2" className={classes.time}>
          {props.time}
        </Typography>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: 'fit-content',
    maxWidth: '85%',
    border: `1px solid ${theme.palette.primary.semi}`,
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  wrap: {
    width: '100%',
  },
  author: {
    marginBottom: theme.spacing(1),
  },
  content: {
    marginBottom: theme.spacing(1),
  },
  time: {
    alignSelf: 'flex-end',
  },
}));

import React from 'react';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import TimeAgo from 'timeago-react';

export default function Message(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.wrap}
      style={!props.him ? { display: 'flex', justifyContent: 'flex-end' } : null}
    >
      <div
        className={classes.root}
        style={props.him ? { background: 'rgba(106, 131, 255, 0.745)' } : null}
      >
        <Typography variant="caption" className={classes.author}>
          {props.author}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1" className={classes.content}>
          {props.content}
        </Typography>
        <Typography variant="caption" className={classes.time}>
          <TimeAgo datetime={props.time} />
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
    minWidth: '20%',
    maxWidth: '85%',
    border: `1px solid ${theme.palette.primary.semi}`,
    background: theme.palette.primary.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  wrap: {
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  author: {
    marginBottom: theme.spacing(1),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  time: {
    alignSelf: 'flex-end',
  },
}));

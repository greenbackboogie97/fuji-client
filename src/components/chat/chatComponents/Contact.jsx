import React from 'react';
import { Avatar, Badge, makeStyles, Typography } from '@material-ui/core';

export default function Contact(props) {
  const classes = useStyles();
  return (
    <li className={classes.root} onClick={props.onClick}>
      <Badge
        color="secondary"
        overlap="circular"
        variant="dot"
        className={classes.badge}
        invisible={props.connected === false}
      >
        <Avatar className={classes.avatar} src={props.avatar} />
      </Badge>
      {props.expanded && (
        <Typography className={classes.username} variant="body1">
          {props.username}
        </Typography>
      )}
    </li>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  badge: {
    fill: 'yellow',
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  username: {
    textAlign: 'center',
    marginLeft: theme.spacing(2),
  },
}));

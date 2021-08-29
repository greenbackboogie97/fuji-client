import React from 'react';
import {
  Badge,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

export default function Contact(props) {
  const classes = useStyles();
  return (
    <ListItem className={classes.root} onClick={props.onClick}>
      <ListItemAvatar>
        <Badge variant="dot" className={classes.badge} overlap="circular">
          <Avatar className={classes.avatar} src={props.avatarSrc} />
        </Badge>
      </ListItemAvatar>
      {props.expanded ? (
        <ListItemText className={classes.contactText} primary={props.username} />
      ) : null}
    </ListItem>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
  contactText: {
    color: theme.palette.primary.contrastText,
  },
  badge: {
    '& .MuiBadge-badge': {
      background: theme.palette.secondary.connected,
    },
  },
  avatar: {
    height: '32px',
    width: '32px',
  },
}));

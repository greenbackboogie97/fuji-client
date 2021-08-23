import React from 'react';
import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { IoIosNotifications } from 'react-icons/io';

export default function NotificationsButton() {
  const classes = useStyles();
  return (
    <IconButton className={classes.root}>
      <Badge badgeContent={9} color="primary">
        <IoIosNotifications className={classes.icon} />
      </Badge>
    </IconButton>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: 4,
  },
  icon: {
    padding: 0,
    fontSize: '26px',
    color: theme.palette.primary.contrastText,
  },
}));

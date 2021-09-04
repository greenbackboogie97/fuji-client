import React from 'react';
import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { IoIosNotifications } from 'react-icons/io';

export default function NotificationsButton() {
  const classes = useStyles();
  return (
    <Badge badgeContent={9} color="primary" className={classes.root}>
      <IconButton className={classes.icon}>
        <IoIosNotifications />
      </IconButton>
    </Badge>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    // padding: theme.spacing(1),
  },
  icon: {
    padding: 0,
    color: theme.palette.primary.contrastText,
  },
}));

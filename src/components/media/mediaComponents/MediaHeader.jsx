import React from 'react';
import { Divider, IconButton, makeStyles } from '@material-ui/core';
import { IoClose } from 'react-icons/io5';
import { ReactComponent as Logo } from '../../../static/FujiMedia.svg';

export default function MediaHeader(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Logo fill="currentColor" />
        <IconButton className={classes.close} onClick={props.onClose}>
          <IoClose />
        </IconButton>
      </div>
      <Divider />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    padding: theme.spacing(1),
    background: theme.palette.primary.background.paper,
  },
  close: {
    padding: 0,
  },
}));

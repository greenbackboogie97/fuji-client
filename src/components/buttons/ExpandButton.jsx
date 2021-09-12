import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { IoMdArrowDropright } from 'react-icons/io';

export default function ExpandButton(props) {
  const classes = useStyles();

  return (
    <IconButton
      onClick={props.expandHandler}
      className={classes.root}
      style={props.expanded ? { transform: 'rotate(180deg)' } : null}
    >
      <IoMdArrowDropright />
    </IconButton>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '0',
    margin: '0',
    fontSize: '16px',
  },
});

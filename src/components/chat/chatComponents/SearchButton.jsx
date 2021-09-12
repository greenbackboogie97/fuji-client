import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { IoMdSearch } from 'react-icons/io';

export default function SearchButton(props) {
  const classes = useStyles();

  return (
    <IconButton className={classes.root} onClick={props.onClick} color="inherit">
      <IoMdSearch />
    </IconButton>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    fontSize: 22,
    marginRight: theme.spacing(2),
    marginLeft: 5,
  },
}));

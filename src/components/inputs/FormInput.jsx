import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

export default function FormInput(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      label={props.label}
      required={props.required}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

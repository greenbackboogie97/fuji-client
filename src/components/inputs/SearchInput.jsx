import React from 'react';
import { makeStyles, InputBase, InputAdornment } from '@material-ui/core';

export default function SearchInput(props) {
  const classes = useStyles();

  return (
    <InputBase
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      inputRef={props.inputRef}
      className={classes.root}
      endAdornment={
        props.adorment && (
          <InputAdornment className={classes.adorment}>{props.adormentIcon}</InputAdornment>
        )
      }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.background.default,
    height: '36px',
    width: '100%',
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    '&:focus-within': {
      boxShadow: `inset 0 0 4px ${theme.palette.primary.semi}`,
    },
  },
  adorment: {
    marginRight: '6px',
    color: theme.palette.secondary.semi,
  },
}));

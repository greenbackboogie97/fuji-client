import React, { useState } from 'react';
import { InputBase, makeStyles, IconButton, CircularProgress } from '@material-ui/core';
import { MdSend } from 'react-icons/md';

export default function MessageField(props) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (value.length < 1) return;
    props.onSubmit(value);
    setValue('');
  };

  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
      <InputBase
        className={classes.textField}
        placeholder={props.placeholder}
        onChange={handleValueChange}
        value={value}
        endAdornment={
          <IconButton
            disabled={value.length < 1}
            onClick={handleFormSubmit}
            className={classes.adorment}
          >
            {props.status !== 'loading' ? (
              <MdSend style={{ cursor: 'pointer' }} />
            ) : (
              <CircularProgress size={16} color="inherit" />
            )}
          </IconButton>
        }
      />
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1',
    display: 'flex',
  },
  textField: {
    flex: '1',
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.background.default,
    '&:focus-within': {
      boxShadow: `inset 0 0 4px ${theme.palette.primary.semi}`,
    },
  },
  adorment: {
    fontSize: 16,
    padding: theme.spacing(1),
  },
}));

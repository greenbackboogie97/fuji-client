import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';

export default function SignIn() {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <h1>Welcome back! Sign in to your Fuji account</h1>
      </div>
      <TextField label="Email" required />
      <TextField label="Password" type="password" required />
      <Button>Sign In</Button>
      <Button>New to Fuji? Sign up here</Button>
    </form>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
  },
});

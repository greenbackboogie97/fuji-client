import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Route } from 'react-router-dom';

import SignIn from '../components/SignIn.jsx';
import SignUp from '../components/SignUp.jsx';

export default function Welcome() {
  const classes = useStyles();

  return (
    <Container className={classes.root} fluid maxWidth="xs">
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
  },
});

import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Redirect, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import SignIn from '../components/forms/SignIn.jsx';
import SignUp from '../components/forms/SignUp.jsx';

export default function Welcome() {
  const classes = useStyles();
  const authSelector = useSelector((state) => state.auth);

  return (
    <Container className={classes.root} fluid="true" maxWidth="xs">
      {authSelector.user && <Redirect to="/" />}
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
    justifyContent: 'center',
    height: '100vh',
  },
});

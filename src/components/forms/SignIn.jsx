import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button, Tooltip, Typography, CircularProgress } from '@material-ui/core';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';
import FormInput from '../inputs/FormInput.jsx';
import { cleanAuthState, signIn } from '../../services/redux/reducers/authReducer';

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const authSelector = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleEmailChange = (e) => setForm((prev) => ({ ...prev, email: e.target.value }));
  const hanldePasswordChange = (e) => setForm((prev) => ({ ...prev, password: e.target.value }));

  const handleSignIn = () => {
    dispatch(signIn(form));
  };

  const handleSecondaryButtonClick = () => {
    dispatch(cleanAuthState());
    history.push('/signup');
  };

  return (
    <form className={classes.root} autoComplete="off">
      <BrandLogo className={classes.logo} />
      <Typography className={classes.heading} variant="h5">
        Sign in to your account
      </Typography>
      <FormInput label="Email" onChange={handleEmailChange} value={form.email} />
      <FormInput
        label="Password"
        type="password"
        onChange={hanldePasswordChange}
        value={form.password}
      />
      <Tooltip
        open={Boolean(authSelector.error)}
        title={authSelector.error || ''}
        placement="bottom"
        arrow
      >
        <Button className={classes.signInButton} onClick={handleSignIn}>
          {authSelector.status === 'pending' ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            'SIGN IN'
          )}
        </Button>
      </Tooltip>
      <Button variant="text" color="secondary" onClick={handleSecondaryButtonClick}>
        New to Fuji? Sign Up Here
      </Button>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.background.paper,
    padding: theme.spacing(4),
  },
  logo: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  signInButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10),
  },
}));

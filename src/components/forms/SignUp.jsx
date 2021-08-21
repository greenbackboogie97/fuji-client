import React, { useState } from 'react';
import { Button, CircularProgress, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../inputs/FormInput.jsx';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';
import { cleanAuthState, signUp } from '../../services/redux/reducers/authReducer';

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const authSelector = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleEmailChange = (e) => setForm((prev) => ({ ...prev, email: e.target.value }));
  const handleUsernameChange = (e) => setForm((prev) => ({ ...prev, username: e.target.value }));
  const handlePasswordChange = (e) => setForm((prev) => ({ ...prev, password: e.target.value }));
  const handleConfirmPasswordChange = (e) =>
    setForm((prev) => ({ ...prev, confirmPassword: e.target.value }));

  const handleSignUp = () => dispatch(signUp(form));

  const handleSecondaryButtonClick = () => {
    dispatch(cleanAuthState());
    history.push('/signin');
  };

  return (
    <form className={classes.root} autoComplete="off">
      <BrandLogo className={classes.logo} />
      <Typography className={classes.heading} variant="h5">
        Create your account
      </Typography>
      <FormInput label="Email" onChange={handleEmailChange} value={form.email} />
      <FormInput label="Username" onChange={handleUsernameChange} value={form.username} />
      <FormInput
        label="Password"
        type="password"
        onChange={handlePasswordChange}
        value={form.password}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        onChange={handleConfirmPasswordChange}
        value={form.confirmPassword}
      />
      <Tooltip
        open={Boolean(authSelector.error)}
        title={`${authSelector.error?.slice(0, 110)}...` || ''}
        placement="bottom"
        arrow
      >
        <Button className={classes.signInButton} onClick={handleSignUp}>
          {authSelector.status === 'pending' ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            'SIGN UP'
          )}
        </Button>
      </Tooltip>
      <Button variant="text" color="secondary" onClick={handleSecondaryButtonClick}>
        Already have an account? Sign in
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

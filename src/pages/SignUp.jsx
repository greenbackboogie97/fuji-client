import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../components/inputs/FormInput.jsx';
import { ReactComponent as BrandLogo } from '../static/Fuji.svg';
import { cleanAuthState, signUp } from '../services/redux/slices/authSlice/authReducer';
import {
  authErrorSelector,
  authStatusSelector,
} from '../services/redux/slices/authSlice/authSelectors';

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const authError = useSelector((state) => authErrorSelector(state));
  const authStatus = useSelector((state) => authStatusSelector(state));

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  const handleEmailChange = (e) => setForm((prev) => ({ ...prev, email: e.target.value }));
  const handleUsernameChange = (e) => setForm((prev) => ({ ...prev, name: e.target.value }));
  const handlePasswordChange = (e) => setForm((prev) => ({ ...prev, password: e.target.value }));
  const handleConfirmPasswordChange = (e) =>
    setForm((prev) => ({ ...prev, passwordConfirm: e.target.value }));

  const handleSignUp = () => dispatch(signUp(form));

  const handleSecondaryButtonClick = () => {
    dispatch(cleanAuthState());
    history.push('/signin');
  };

  return authStatus === 'logged' ? (
    <Redirect to="/" />
  ) : (
    <Container className={classes.root} fluid="true" maxWidth="xs">
      <form className={classes.form} autoComplete="off">
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
          open={Boolean(authError)}
          title={`${authError?.slice(0, 110)}...` || ''}
          placement="bottom"
          arrow
        >
          <Button className={classes.signInButton} onClick={handleSignUp}>
            {authStatus === 'pending' ? <CircularProgress color="inherit" size={24} /> : 'SIGN UP'}
          </Button>
        </Tooltip>
        <Button variant="text" color="secondary" onClick={handleSecondaryButtonClick}>
          Already have an account? Sign in
        </Button>
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.background.paper,
    padding: theme.spacing(8),
  },
  logo: {
    marginBottom: theme.spacing(4),
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(8),
  },
  signInButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(20),
  },
}));

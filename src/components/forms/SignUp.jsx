import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FormInput from '../inputs/FormInput.jsx';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

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

  const handleSecondaryButtonClick = () => history.push('/signin');

  return (
    <form className={classes.root} autoComplete="off">
      <BrandLogo className={classes.logo} />
      <Typography className={classes.heading} variant="h5">
        Create your account
      </Typography>
      <FormInput label="Email" required onChange={handleEmailChange} value={form.email} />
      <FormInput label="Username" required onChange={handleUsernameChange} value={form.username} />
      <FormInput
        label="Password"
        type="password"
        required
        onChange={handlePasswordChange}
        value={form.password}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        required
        onChange={handleConfirmPasswordChange}
        value={form.confirmPassword}
      />
      <Button className={classes.signInButton}>SIGN UP</Button>
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
    marginBottom: theme.spacing(2),
  },
}));

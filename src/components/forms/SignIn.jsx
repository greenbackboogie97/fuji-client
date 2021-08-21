import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FormInput from '../inputs/FormInput.jsx';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleEmailChange = (e) => setForm((prev) => ({ ...prev, email: e.target.value }));
  const hanldePasswordChange = (e) => setForm((prev) => ({ ...prev, password: e.target.value }));

  const handleSecondaryButtonClick = () => history.push('/signup');

  return (
    <form className={classes.root} autoComplete="off">
      <BrandLogo className={classes.logo} />
      <Typography className={classes.heading} variant="h5">
        Sign in to your account
      </Typography>
      <FormInput label="Email" required onChange={handleEmailChange} value={form.email} />
      <FormInput
        label="Password"
        type="password"
        required
        onChange={hanldePasswordChange}
        value={form.password}
      />
      <Button className={classes.signInButton}>SIGN IN</Button>
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
    marginBottom: theme.spacing(2),
  },
}));

import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrandLogo className={classes.logo} />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100vh',
    maxHeight: '100vh',
    width: '100vw',
    maxWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    filter: 'grayscale(100%)',
    opacity: 0.5,
  },
});

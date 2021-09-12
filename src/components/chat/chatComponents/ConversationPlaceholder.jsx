import React from 'react';
import { Link, makeStyles } from '@material-ui/core';
import { ReactComponent as BrandLogo } from '../../../static/Fuji.svg';

export default function ConversationPlaceholder() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrandLogo className={classes.logo} />
      <Link
        href="https://github.com/greenbackboogie97"
        target="_blank"
        rel="noreferer"
        className={classes.credit}
      >
        By Omer Ziger
      </Link>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    filter: 'grayscale(100%)',
    opacity: 0.5,
    marginBottom: theme.spacing(2),
  },
  credit: {
    cursor: 'pointer',
    color: '#8D8F92',
    '&:hover': {
      textDecoration: 'none',
      opacity: 0.7,
    },
  },
}));

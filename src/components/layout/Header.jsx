import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';
import ThemeSwitch from '../buttons/ThemeSwitch.jsx';
import SearchInput from '../inputs/SearchInput.jsx';
import UserMenuButton from '../buttons/UserMenuButton.jsx';

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogoClick = () => history.push('/');

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar} variant="dense">
        <BrandLogo className={classes.logo} onClick={handleLogoClick} />
        <div>
          <SearchInput placeholder="Search Fuji..." />
        </div>
        <div className={classes.toolbarRight}>
          <ThemeSwitch />
          <UserMenuButton />
        </div>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.background.paper,
    borderBottom: `1px solid ${theme.palette.primary.semi}`,
  },
  toolbar: {
    padding: `0 ${theme.spacing(2)}px`,
  },
  toolbarRight: {
    display: 'flex',
    paddingLeft: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
}));

import React, { useState } from 'react';
import { AppBar, Collapse, makeStyles, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BrandLogo } from '../../static/Fuji.svg';
import ThemeSwitch from '../buttons/ThemeSwitch.jsx';
import SearchInput from '../inputs/SearchInput.jsx';
import UserMenuButton from '../buttons/UserMenuButton.jsx';
import SearchDropdown from '../searchDropdown/SearchDropdown.jsx';

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [mount, setMount] = useState();
  const [value, setValue] = useState('');

  const handleLogoClick = () => history.push('/');

  const handleSearchChange = (e) => {
    setValue(e.target.value);
    if (!mount) {
      setMount(true);
    }
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar} variant="dense">
        <BrandLogo className={classes.logo} onClick={handleLogoClick} />
        <div className={classes.searchContainer}>
          <SearchInput
            placeholder="Search Fuji..."
            onChange={(e) => handleSearchChange(e)}
            value={value}
          />
          <Collapse in={mount && value.length > 0} unmountOnExit>
            <SearchDropdown value={value} />
          </Collapse>
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
  searchContainer: {
    width: 'fit-content',
    position: 'relative',
  },
}));

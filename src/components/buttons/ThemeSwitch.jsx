import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../services/redux/slices/themeSlice/themeReducer';
import { themeTypeSelector } from '../../services/redux/slices/themeSlice/themeSelectors';
import darkThemeIcon from '../../static/dark.png';
import lightThemeIcon from '../../static/light.png';

export default function ThemeSwitch() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const themeType = useSelector((state) => themeTypeSelector(state));

  const handleSwitchClick = () => {
    if (themeType === 'dark') dispatch(setTheme('light'));
    if (themeType === 'light') dispatch(setTheme('dark'));
  };

  return (
    <IconButton className={classes.root} onClick={handleSwitchClick}>
      {themeType === 'light' ? (
        <img className={classes.icon} src={lightThemeIcon} alt="light theme" />
      ) : (
        <img className={classes.icon} src={darkThemeIcon} alt="dark theme" />
      )}
    </IconButton>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  icon: {
    height: 38,
  },
}));

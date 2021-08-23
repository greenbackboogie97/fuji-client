import React from 'react';
import { withStyles, Switch } from '@material-ui/core';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../services/redux/slices/themeSlice/themeReducer';
import { themeTypeSelector } from '../../services/redux/slices/themeSlice/themeSelectors';

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const themeType = useSelector((state) => themeTypeSelector(state));

  const handleSwitchClick = () => {
    if (themeType === 'dark') dispatch(setTheme('light'));
    if (themeType === 'light') dispatch(setTheme('dark'));
  };

  return (
    <ModeSwitch
      disableRipple
      icon={<IoMoon />}
      checkedIcon={<IoSunny />}
      onClick={handleSwitchClick}
    />
  );
}

const ModeSwitch = withStyles((theme) => ({
  root: {
    width: 32,
    height: 32,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  track: {
    opacity: 0,
  },
  switchBase: {
    color: theme.palette.primary.contrastText,
    fontSize: 26,
    padding: 3,
    '&.Mui-checked': {
      color: theme.palette.primary.contrastText,
      transform: 'translateX(0px)',
      '& + .MuiSwitch-track': {
        opacity: 0,
      },
    },
  },
}))(Switch);

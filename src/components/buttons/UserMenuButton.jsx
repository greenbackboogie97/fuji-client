import React, { useState } from 'react';
import { Avatar, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authUserSelector } from '../../services/redux/slices/authSlice/authSelectors';
import { cleanAuthState } from '../../services/redux/slices/authSlice/authReducer';
import ChangePassword from '../forms/ChangePassword.jsx';
import { cleanChatReducer } from '../../services/redux/slices/chatSlice/chatReducer';

export default function UserMenuButton() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => authUserSelector(state));
  const [anchorEl, setAnchorEl] = useState(null);
  const [changePassword, setChangePassword] = useState(false);

  const handleMenuClick = (e) => setAnchorEl(e.target);
  const handleClose = () => setAnchorEl(null);

  const handleChangePasswordClose = () => setChangePassword(false);

  const handleProfileClick = () => {
    handleClose();
    history.push(`/profile/${authUser._id}`);
  };

  const handleSignOutClick = () => {
    handleClose();
    dispatch(cleanAuthState());
    dispatch(cleanChatReducer());
  };

  return (
    <>
      <IconButton className={classes.root} onClick={handleMenuClick}>
        <Avatar className={classes.avatar} src={authUser.profilePicture} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} style={{ top: 34 }}>
        <MenuItem onClick={handleProfileClick}>
          <Typography noWrap>Your Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => setChangePassword(true)}>
          <Typography noWrap>Change Password</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOutClick}>
          <Typography noWrap>Sign Out</Typography>
        </MenuItem>
      </Menu>
      <ChangePassword open={changePassword} onClose={handleChangePasswordClose} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  avatar: {
    cursor: 'pointer',
    height: '24px',
    width: '24px',
  },
}));

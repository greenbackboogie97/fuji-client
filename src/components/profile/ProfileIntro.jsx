import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Media from '../media/Media.jsx';
import { authUserSelector } from '../../services/redux/slices/authSlice/authSelectors';
import { editUser } from '../../services/redux/slices/authSlice/authReducer';

export default function ProfileIntro(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => authUserSelector(state));
  const isMe = authUser._id === props.id;
  const [username, setUsername] = useState(authUser.name);
  const [bio, setBio] = useState(authUser.bio);
  const [profilePicture, setProfilePicture] = useState(authUser.profilePicture);
  const [mediaOpen, setMediaOpen] = useState(false);

  const handleMediaOpen = () => setMediaOpen(true);
  const handleMediaClose = () => setMediaOpen(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleBioChange = (e) => setBio(e.target.value);

  const handleEditedValue = (key, value) => {
    if (authUser[key] !== value) dispatch(editUser({ key, value }));
  };

  useEffect(() => {
    setProfilePicture(authUser.profilePicture);
  }, [authUser.profilePicture]);

  return isMe ? (
    <>
      <Grid className={classes.root} ref={props.rootRef}>
        <Avatar className={classes.profilePicEdit} src={profilePicture} onClick={handleMediaOpen} />
        <input
          value={username}
          onBlur={() => handleEditedValue('name', username)}
          className={classes.usernameEdit}
          onChange={handleUsernameChange}
          maxLength={32}
        />
        <input
          value={bio}
          placeholder="Bio goes here"
          className={classes.bioEdit}
          onChange={handleBioChange}
          maxLength={32}
          onBlur={() => handleEditedValue('bio', bio)}
        />
      </Grid>
      <Media
        mediaID={authUser._id}
        open={mediaOpen}
        onClose={handleMediaClose}
        profilePictureSelect={true}
      />
    </>
  ) : (
    <Grid className={classes.root} ref={props.rootRef}>
      <Avatar className={classes.profilePic} src={props.profilePic} />
      <Typography variant="h4" className={classes.username}>
        {props.username}
      </Typography>
      <Typography className={classes.bio}>{props.bio}</Typography>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '223px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    background: theme.palette.primary.background.paper,
  },
  profilePic: {
    width: '120px',
    height: '120px',
    marginBottom: theme.spacing(4),
  },
  profilePicEdit: {
    width: '120px',
    height: '120px',
    marginBottom: theme.spacing(4),
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.7,
    },
  },
  username: {
    fontWeight: '700',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  usernameEdit: {
    border: 'unset',
    background: 'unset',
    color: theme.palette.primary.contrastText,
    fontWeight: '700',
    width: 'fit-content',
    textAlign: 'center',
    fontSize: 27,
    padding: 4,
    '&:focus': {
      outline: 'unset',
    },
    '&:hover': {
      opacity: 0.7,
    },
  },
  bio: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
  },
  bioEdit: {
    color: theme.palette.primary.contrastText,
    border: 'unset',
    background: 'unset',
    fontFamily: 'Inter',
    fontSize: 15,
    textAlign: 'center',
    '&:focus': {
      outline: 'unset',
    },
    '&:hover': {
      opacity: 0.7,
    },
  },
}));

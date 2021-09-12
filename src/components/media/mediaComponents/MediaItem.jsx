import React, { useState } from 'react';
import { Button, Checkbox, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../../services/redux/slices/authSlice/authReducer';
import { addMedia, removeMedia } from '../../../services/redux/slices/newPostSlice/newPostReducer';
import { authUserSelector } from '../../../services/redux/slices/authSlice/authSelectors';
import { newPostMediaSelector } from '../../../services/redux/slices/newPostSlice/newPostSelectors';

export default function MediaItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => authUserSelector(state));
  const newPostMedia = useSelector((state) => newPostMediaSelector(state));
  const [selected, setSelected] = useState(newPostMedia.includes(props.url));

  const handleImageSelect = () => {
    if (selected) {
      dispatch(removeMedia(props.url));
      return setSelected(false);
    }
    dispatch(addMedia(props.url));
    return setSelected(true);
  };

  const handleProfilePictureSelect = () => {
    if (authUser.profilePicture !== props.url)
      dispatch(editUser({ key: 'profilePicture', value: props.url }));
  };

  return (
    <Grid item xs={'auto'} className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={props.url} alt="media" className={classes.image} />
        <div className={classes.options}>
          <span className={classes.chip}>{`${props.index + 1}/${props.length}`}</span>
          {props.newPost && (
            <Checkbox
              className={classes.checkbox}
              color="default"
              checked={selected}
              onChange={handleImageSelect}
              disabled={newPostMedia.length === 4 && !newPostMedia.includes(props.url)}
            />
          )}
          {props.profilePictureSelect && (
            <Button color="primary" onClick={handleProfilePictureSelect}>
              Set Profile Picture
            </Button>
          )}
        </div>
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
  },
  image: {
    maxHeight: 'calc(30vh - 8px)',
    maxWidth: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  options: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    left: theme.spacing(1),
    top: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.semi}`,
    background: theme.palette.primary.background.paper,
  },
  chip: {
    color: theme.palette.primary.contrastText,
  },
  checkbox: {
    padding: 0,
  },
}));

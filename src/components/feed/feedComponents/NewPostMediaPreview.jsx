import React from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { removeMedia } from '../../../services/redux/slices/newPostSlice/newPostReducer';

export default function NewPostMediaPreview(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleImageRemove = () => dispatch(removeMedia(props.url));

  return (
    <Grid item xs={4} className={classes.root}>
      <div className={classes.imageContainer}>
        <IconButton className={classes.remove} onClick={handleImageRemove}>
          <IoIosRemoveCircle />
        </IconButton>
        <img src={props.url} className={classes.img} alt="upload" />
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.primary.background.default,
    borderRadius: theme.shape.borderRadius,
  },
  img: {
    maxHeight: '30vh',
    maxWidth: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  remove: {
    position: 'absolute',
    padding: 0,
    margin: theme.spacing(1),
    background: theme.palette.primary.background.paper,
    color: theme.palette.primary.contrastText,
  },
}));

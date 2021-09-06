import React, { useState, useEffect } from 'react';
import { Modal, makeStyles, Divider, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import MediaHeader from './mediaComponents/MediaHeader.jsx';
import MediaPlaceholder from './mediaComponents/MediaPlaceholder.jsx';
import MediaItem from './mediaComponents/MediaItem.jsx';
import MediaUpload from './mediaComponents/MediaUpload.jsx';
import FujiAPI from '../../services/API/FujiAPI';

export default function Media(props) {
  const classes = useStyles();
  const userID = useSelector((state) => state.auth.user._id);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    if (props.open) FujiAPI.media.getMedia(props.mediaID).then((res) => setMedia(res.data.media));

    return setMedia([]);
  }, [props.mediaID, userID, props.open]);

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className={classes.root}>
        <MediaHeader />
        <Grid container className={classes.grid}>
          {!media.length ? (
            <MediaPlaceholder />
          ) : (
            media.map((image, id) => {
              return (
                <MediaItem
                  key={id}
                  url={image}
                  index={id}
                  length={media.length}
                  newPost={props.newPost}
                  profilePictureSelect={props.profilePictureSelect}
                />
              );
            })
          )}
        </Grid>
        <Divider />
        {userID === props.mediaID && <MediaUpload />}
      </div>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.primary.background.default,
    overflow: 'hidden',
    height: 'calc(60vh + 100px)',
    width: '80vw',
    margin: 'calc(20vh - 50px) 10vw',
  },
  grid: {
    height: '60vh',
    overflow: 'auto',
  },
}));

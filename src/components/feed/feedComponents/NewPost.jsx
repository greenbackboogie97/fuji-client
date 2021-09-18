/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Card, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { EditorState } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { publishPost } from '../../../services/redux/slices/newPostSlice/newPostReducer';
import {
  newPostMediaSelector,
  newPostStatusSelector,
} from '../../../services/redux/slices/newPostSlice/newPostSelectors';
import NewPostMediaPreview from './NewPostMediaPreview.jsx';
import Media from '../../media/Media.jsx';
import { authUserSelector } from '../../../services/redux/slices/authSlice/authSelectors';
import TextEditor from '../../textEditor/TextEditor.jsx';

export default function NewPost() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mediaOpen, setMediaOpen] = useState(false);
  const authUserID = useSelector((state) => authUserSelector(state))._id;
  const newPostMedia = useSelector((state) => newPostMediaSelector(state));
  const newPostStatus = useSelector((state) => newPostStatusSelector(state));

  const handleMediaOpen = () => setMediaOpen(true);
  const handleMediaClose = () => setMediaOpen(false);

  const handlePostClick = async () => {
    await dispatch(publishPost({ content: editorState, media: newPostMedia }));
    setEditorState(EditorState.createEmpty());
  };

  return (
    <Grid item xs={12} sm={10} md={9} lg={8} xl={7} className={classes.root}>
      <Card className={classes.card}>
        <TextEditor
          editorState={editorState}
          setEditorState={setEditorState}
          onMediaClick={handleMediaOpen}
        />
        {!!newPostMedia.length && (
          <Grid container>
            {newPostMedia.map((image, index) => {
              return <NewPostMediaPreview key={index} url={image} />;
            })}
          </Grid>
        )}
        <Media mediaID={authUserID} newPost={true} open={mediaOpen} onClose={handleMediaClose} />
        <Button
          color="primary"
          disabled={editorState.length < 1 && newPostMedia.length < 1}
          onClick={handlePostClick}
        >
          {newPostStatus !== 'loading' ? 'Post' : <CircularProgress color="inherit" size={21} />}
        </Button>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(2),
  },
  card: {
    boxShadow: 'unset',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.background.paper,
    border: `1px solid ${theme.palette.primary.semi}`,
    padding: theme.spacing(2),
  },
  input: {
    background: theme.palette.primary.background.default,
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: '6px',
    flex: 1,
    padding: '8px',
    marginBottom: '8px',
    '&:focus-within': {
      boxShadow: `inset 0 0 4px ${theme.palette.primary.semi}`,
    },
  },
  media: {
    cursor: 'pointer',
    color: theme.palette.secondary.button,
    fontSize: '24px',
    padding: 4,
  },
}));

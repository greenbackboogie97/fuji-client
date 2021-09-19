import React, { useState } from 'react';
import { Grid, Card, Collapse, makeStyles, List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PostHeader from './postComponents/PostHeader.jsx';
import PostContent from './postComponents/PostContent.jsx';
import PostSocialBar from './postComponents/PostSocialBar.jsx';
import CommentInput from '../inputs/CommentInput.jsx';
import PostComment from './postComponents/PostComment.jsx';
import {
  addComment,
  addLike,
  cleanPostComments,
  getComments,
  removeLike,
} from '../../services/redux/slices/feedSlice/feedReducer';
import {
  currentPostSelector,
  feedCommentsStatusSelector,
  newCommentStatusSelector,
} from '../../services/redux/slices/feedSlice/feedSelectors';
import { authUserSelector } from '../../services/redux/slices/authSlice/authSelectors';

export default function Post(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const currentPost = useSelector((state) => currentPostSelector(state, props.postID));
  const authUser = useSelector((state) => authUserSelector(state));
  const newCommentStatus = useSelector((state) => newCommentStatusSelector(state));
  const feedCommentsStatus = useSelector((state) => feedCommentsStatusSelector(state));
  const [liked, setLiked] = useState(currentPost.likes.some((like) => like._id === authUser._id));

  const handleCommentClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      dispatch(getComments(currentPost._id));
    }
    if (expanded) dispatch(cleanPostComments(currentPost._id));
  };

  const handleCommentSubmit = (content) => dispatch(addComment({ id: currentPost._id, content }));

  const handleLikeClick = () => {
    if (!liked) {
      dispatch(addLike(currentPost._id)).then(setLiked(true));
    }
    if (liked) {
      dispatch(removeLike(currentPost._id)).then(setLiked(false));
    }
  };

  return (
    currentPost && (
      <Grid item xs={12} sm={10} md={9} lg={8} xl={5}>
        <Card className={classes.root}>
          <PostHeader
            avatar={currentPost.author.profilePicture}
            username={currentPost.author.name}
            time={currentPost.createdAt}
            action={currentPost.author._id === authUser._id}
            postID={currentPost._id}
            authorID={currentPost.author._id}
          />
          <PostContent content={currentPost.content} media={currentPost.media} />
          <PostSocialBar
            liked={liked}
            likesCount={currentPost.likes.length}
            onLikeClick={handleLikeClick}
            commentsCount={currentPost.comments.length}
            onCommentClick={handleCommentClick}
            commentsExpanded={expanded}
          />
          <Collapse in={expanded} unmountOnExit>
            <CommentInput
              onSubmit={(value) => handleCommentSubmit(value)}
              placeholder="Write a comment..."
              status={newCommentStatus}
            />
            {currentPost.fetchedComments && feedCommentsStatus !== 'pending' && (
              <List>
                {currentPost.fetchedComments.map((comment) => {
                  return (
                    comment.author && (
                      <PostComment
                        key={comment._id}
                        authorID={comment.author._id}
                        avatar={comment.author.profilePicture}
                        username={comment.author.name}
                        content={comment.content}
                        time={comment.createdAt}
                      />
                    )
                  );
                })}
              </List>
            )}
          </Collapse>
        </Card>
      </Grid>
    )
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.background.paper,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(5),
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'unset',
    width: '100%',
  },
}));

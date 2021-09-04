import React, { useState } from 'react';
import { Grid, Card, Collapse, makeStyles, List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PostHeader from './postComponents/PostHeader.jsx';
import PostContent from './postComponents/PostContent.jsx';
import PostSocialBar from './postComponents/PostSocialBar.jsx';
import CommentInput from '../inputs/CommentInput.jsx';
import PostComment from './postComponents/PostComment.jsx';
import setTime from '../../util/timeFormating';
import { addComment, addLike, removeLike } from '../../services/redux/slices/feedSlice/feedReducer';
import { currentPostSelector } from '../../services/redux/slices/feedSlice/feedSelectors';
import { authUserSelector } from '../../services/redux/slices/authSlice/authSelectors';
import FujiAPI from '../../services/API/FujiAPI';

export default function Post(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [commentsStatus, setCommentsStatus] = useState('idle');
  const [commentSubmitStatus, setCommentSubmitStatus] = useState('idle');
  const currentPost = useSelector((state) => currentPostSelector(state, props.postID));
  const [comments, setComments] = useState(currentPost.comments);
  const authUser = useSelector((state) => authUserSelector(state));
  const liked = Boolean(currentPost.likes.find((like) => like._id === authUser._id));

  const handleCommentClick = async () => {
    setExpanded(!expanded);
    if (expanded === false) {
      setCommentsStatus('loading');
      const response = await FujiAPI.feed.getComments(currentPost._id);
      setComments(response.data.data.comments);
      setCommentsStatus('success');
    }
  };

  const handleCommentSubmit = async (content) => {
    setCommentSubmitStatus('loading');
    const response = await FujiAPI.feed.addComment({ id: currentPost._id, content });
    setComments((prev) => [...prev, response.data.data.comment]);
    dispatch(addComment({ postID: currentPost._id, commentID: response.data.data._id }));
    setCommentSubmitStatus('success');
  };

  const handleLikeClick = async () => {
    if (!liked) {
      await FujiAPI.feed.addLike(currentPost._id);
      dispatch(addLike({ postID: currentPost._id, authUser }));
    }
    if (liked) {
      await FujiAPI.feed.removeLike(currentPost._id);
      dispatch(removeLike({ postID: currentPost._id, authUser }));
    }
  };

  return (
    currentPost && (
      <Grid item xs={12} sm={10} md={9} lg={8} xl={7}>
        <Card className={classes.root}>
          <PostHeader
            avatar={currentPost.author.profilePicture}
            username={currentPost.author.name}
            time={setTime(currentPost.createdAt)}
            action={currentPost.author._id === authUser._id}
            postID={currentPost._id}
            authorID={currentPost.author._id}
          />
          <PostContent content={currentPost.content} media={currentPost.media} />
          <PostSocialBar
            liked={liked}
            likesCount={currentPost.likes.length}
            onLikeClick={handleLikeClick}
            commentsCount={comments.length}
            onCommentClick={handleCommentClick}
            commentsExpanded={expanded}
          />
          <Collapse in={expanded} unmountOnExit>
            <CommentInput
              onSubmit={(value) => handleCommentSubmit(value)}
              placeholder="Write a comment..."
              status={commentSubmitStatus}
            />
            {!!comments.length && commentsStatus !== 'loading' && (
              <List className={classes.comments}>
                {comments.map((comment) => {
                  return (
                    comment.author && (
                      <PostComment
                        key={comment._id}
                        authorID={comment.author._id}
                        avatar={comment.author.profilePicture}
                        username={comment.author.name}
                        content={comment.content}
                        time={setTime(comment.createdAt)}
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
  },
  comments: {
    marginTop: theme.spacing(3),
  },
}));

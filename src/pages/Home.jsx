import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { authStatusSelector } from '../services/redux/slices/authSlice/authSelectors';
import Header from '../components/layout/Header.jsx';
import Feed from '../components/feed/Feed.jsx';
import Footer from '../components/layout/Footer.jsx';
import FeedControl from '../components/feed/feedComponents/FeedControl.jsx';
import NewPost from '../components/feed/feedComponents/NewPost.jsx';
import Post from '../components/post/Post.jsx';
import LoadingPage from '../components/layout/LoadingPage.jsx';
import {
  currentFeedSelector,
  feedPostsSelector,
  feedStatusSelector,
} from '../services/redux/slices/feedSlice/feedSelectors';
import { getPosts } from '../services/redux/slices/feedSlice/feedReducer';
import { newPostStatusSelector } from '../services/redux/slices/newPostSlice/newPostSelectors';
import FriendsFeedPlaceholder from '../components/feed/feedComponents/FriendsFeedPlaceholder.jsx';
import FeedPostsPlaceholder from '../components/feed/feedComponents/FeedPostsPlaceholder.jsx';

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => authStatusSelector(state));
  const currentFeed = useSelector((state) => currentFeedSelector(state));
  const feedPosts = useSelector((state) => feedPostsSelector(state));
  const newPostStatus = useSelector((state) => newPostStatusSelector(state));
  const feedStatus = useSelector((state) => feedStatusSelector(state));
  const newPostMemo = useMemo(() => newPostStatus === 'success', [newPostStatus]);

  useEffect(() => {
    if (!currentFeed) return;
    dispatch(getPosts(currentFeed));
  }, [currentFeed, newPostMemo, dispatch]);

  return (
    (authStatus === 'pending' && <LoadingPage />) ||
    (authStatus === 'logged' ? (
      <div className={classes.root}>
        <Header />
        <Feed>
          <FeedControl />
          <NewPost />
          {(feedStatus === 'pending' && <FeedPostsPlaceholder />) ||
            (!!feedPosts?.length ? (
              feedPosts.map((post) => <Post key={post._id} postID={post._id} />)
            ) : (
              <FriendsFeedPlaceholder />
            ))}
        </Feed>
        <Footer />
      </div>
    ) : (
      <Redirect to="/signup" />
    ))
  );
}

const useStyles = makeStyles({
  root: {
    padding: '49px 0',
    minHeight: '100vh',
  },
});

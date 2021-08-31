/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { authStatusSelector } from '../services/redux/slices/authSlice/authSelectors';
import Header from '../components/layout/Header.jsx';
import Feed from '../components/feed/Feed.jsx';
import Footer from '../components/layout/Footer.jsx';
import FeedControl from '../components/feed/feedComponents/FeedControl.jsx';
import NewPost from '../components/feed/feedComponents/NewPost.jsx';
import {
  currentFeedSelector,
  feedPostsSelector,
  feedStatusSelector,
} from '../services/redux/slices/feedSlice/feedSelectors';
import { getPosts } from '../services/redux/slices/feedSlice/feedReducer';
import Post from '../components/post/Post.jsx';

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => authStatusSelector(state));
  const currentFeed = useSelector((state) => currentFeedSelector(state));
  const feedStatus = useSelector((state) => feedStatusSelector(state));
  const feedPosts = useSelector((state) => feedPostsSelector(state));

  useEffect(() => {
    if (!currentFeed) return;
    dispatch(getPosts(currentFeed));
  }, [currentFeed, dispatch]);

  return authStatus === 'logged' ? (
    <div className={classes.root}>
      <Header />
      <Feed>
        <FeedControl />
        <NewPost />
        {feedPosts.map((post) => (
          <Post key={post._id} postID={post._id} />
        ))}
      </Feed>
      <Footer />
    </div>
  ) : (
    <Redirect to="/signup" />
  );
}

const useStyles = makeStyles({
  root: {
    padding: '49px 0',
    minHeight: '100vh',
  },
});

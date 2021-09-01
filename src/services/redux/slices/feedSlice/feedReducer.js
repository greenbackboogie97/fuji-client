/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';

const initialState = {
  feedName: 'friends',
  posts: {
    posts: [],
    status: 'idle',
    error: null,
  },
};

export const getPosts = createAsyncThunk('feed/getPosts', async (payload) => {
  const response = await FujiAPI.feed.getPosts(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const deletePost = createAsyncThunk('feed/deletePost', async (payload) => {
  const response = await FujiAPI.feed.deletePost(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const feedReducer = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action) => {
      state.feedName = action.payload;
      state.posts.posts = [];
    },
    addComment: (state, action) => {
      const post = state.posts.posts.find((el) => el._id === action.payload.postID);
      post.comments.push(action.payload.commentID);
    },
    addLike: (state, action) => {
      const post = state.posts.posts.find((el) => el._id === action.payload.postID);
      post.likes.push(action.payload.authUser);
    },
    removeLike: (state, action) => {
      const post = state.posts.posts.find((el) => el._id === action.payload.postID);
      const likeIndex = post.likes.findIndex((el) => el._id === action.payload.authUser._id);
      post.likes.splice(likeIndex, 1);
    },
    cleanFeedReducer: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.posts.status = 'pending';
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts.posts = action.payload.posts;
      state.status = 'success';
    },
    [getPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    },
    [deletePost.pending]: (state) => {
      state.posts.deleteStatus = 'pending';
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts.deleteStatus = 'success';
      state.posts.posts = state.posts.posts.filter((post) => post._id !== action.meta.arg);
    },
    [deletePost.rejected]: (state, action) => {
      state.posts.error = action.error.message;
      state.posts.deleteStatus = 'rejected';
    },
  },
});

export default feedReducer.reducer;
export const { setFeed, addComment, addLike, removeLike, cleanFeedReducer } = feedReducer.actions;

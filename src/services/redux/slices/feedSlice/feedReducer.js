/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';

const initialState = {
  feedName: 'friends',
  posts: {
    posts: [],
    commentsStatus: 'idle',
    newCommentStatus: 'idle',
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

export const getComments = createAsyncThunk('feed/getComments', async (payload) => {
  const response = await FujiAPI.feed.getComments(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const addComment = createAsyncThunk('feed/addComment', async (payload) => {
  const response = await FujiAPI.feed
    .addComment({ id: payload.id, content: payload.content })
    .catch((error) => {
      throw error.response.data;
    });
  return response.data.data;
});

export const addLike = createAsyncThunk('feed/addLike', async (payload) => {
  const response = await FujiAPI.feed.addLike(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const removeLike = createAsyncThunk('feed/removeLike', async (payload) => {
  const response = await FujiAPI.feed.removeLike(payload).catch((error) => {
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
    cleanPostComments: (state, action) => {
      const currentPostIndex = state.posts.posts.findIndex((el) => el._id === action.payload);
      delete state.posts.posts[currentPostIndex].fetchedComments;
    },
    cleanFeedState: (state) => {
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
    [getComments.pending]: (state) => {
      state.posts.commentsStatus = 'pending';
    },
    [getComments.fulfilled]: (state, action) => {
      const currentPost = state.posts.posts.find((post) => post._id === action.meta.arg);
      currentPost.fetchedComments = action.payload.comments;
      state.posts.commentsStatus = 'success';
    },
    [addComment.pending]: (state) => {
      state.posts.newCommentStatus = 'pending';
    },
    [addComment.fulfilled]: (state, action) => {
      const currentPostIndex = state.posts.posts.findIndex((el) => el._id === action.meta.arg.id);
      state.posts.posts[currentPostIndex].comments.push(action.payload.comment._id);
      state.posts.posts[currentPostIndex].fetchedComments.push(action.payload.comment);
      state.posts.newCommentStatus = 'success';
    },
    [addLike.fulfilled]: (state, action) => {
      const currentPostIndex = state.posts.posts.findIndex((el) => el._id === action.meta.arg);
      state.posts.posts[currentPostIndex].likes.push(action.payload.like);
    },
    [removeLike.fulfilled]: (state, action) => {
      const currentPostIndex = state.posts.posts.findIndex((el) => el._id === action.meta.arg);
      const removedLikeIndex = state.posts.posts[currentPostIndex].likes.findIndex(
        (like) => like._id === action.payload.removedLike
      );
      state.posts.posts[currentPostIndex].likes.splice(removedLikeIndex, 1);
    },
  },
});

export default feedReducer.reducer;
export const { setFeed, cleanPostComments, cleanFeedState } = feedReducer.actions;

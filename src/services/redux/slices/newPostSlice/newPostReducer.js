import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';

const initialState = {
  status: 'idle',
  media: [],
};

export const publishPost = createAsyncThunk('newPost/publishPost', async (payload) => {
  const response = await FujiAPI.feed.publishPost(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const newPostReducer = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    addMedia: (state, action) => {
      state.media.push(action.payload);
    },
    removeMedia: (state, action) => {
      const index = state.media.findIndex((image) => image === action.payload);
      state.media.splice(index, 1);
    },
  },
  extraReducers: {
    [publishPost.pending]: (state) => {
      state.status = 'pending';
    },
    [publishPost.fulfilled]: (state) => {
      state.status = 'success';
      state.media = [];
    },
    [publishPost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    },
  },
});

export default newPostReducer.reducer;
export const { addMedia, removeMedia } = newPostReducer.actions;

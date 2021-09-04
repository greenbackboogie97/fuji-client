import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';

const initialState = {
  user: null,
  friends: {
    friends: [],
    status: 'idle',
    error: null,
  },
  status: 'idle',
  error: null,
};

export const getUser = createAsyncThunk('profile/getUser', async (payload) => {
  const response = await FujiAPI.users.getUser(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const getFriends = createAsyncThunk('profile/getFriends', async (payload) => {
  const response = await FujiAPI.friends.getFriends(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const addFriend = createAsyncThunk('profile/addFriend', async (payload) => {
  const response = await FujiAPI.friends.addFriend(payload.profile).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const removeFriend = createAsyncThunk('profile/removeFriend', async (payload) => {
  const response = await FujiAPI.friends.removeFriend(payload.profile).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending](state) {
      state.status = 'pending';
    },
    [getUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.status = 'success';
    },
    [getUser.rejected](state, action) {
      state.error = action.error.message;
      state.status = 'rejected';
    },
    [getFriends.fulfilled](state, action) {
      state.friends.friends = action.payload.friends;
      state.friends.status = 'success';
    },
    [addFriend.pending](state) {
      state.friends.status = 'pending';
    },
    [addFriend.fulfilled](state, action) {
      state.user.friends.push(action.meta.arg.user);
      state.friends.status = 'success';
    },
    [addFriend.rejected](state, action) {
      state.friends.error = action.error.message;
      state.friends.status = 'rejected';
    },
    [removeFriend.pending](state) {
      state.friends.status = 'pending';
    },
    [removeFriend.fulfilled](state, action) {
      state.friends.status = 'success';
      const index = state.user.friends.indexOf(action.meta.arg.user);
      state.user.friends.splice(index, 1);
    },
    [removeFriend.rejected](state, action) {
      state.friends.status = 'rejected';
      state.friends.err = action.error.message;
    },
  },
});

export default profileReducer.reducer;

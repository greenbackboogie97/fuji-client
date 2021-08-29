/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const signIn = createAsyncThunk('auth/signIn', async (payload) => {
  const response = await FujiAPI.users.signIn(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const signUp = createAsyncThunk('auth/signup', async (payload) => {
  const response = await FujiAPI.users.signUp(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanAuthState: (state) => (state = initialState),
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.status = 'pending';
    },
    [signIn.fulfilled]: (state, action) => {
      state.error = null;
      state.user = action.payload.user;
      state.status = 'logged';
    },
    [signIn.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    },
    [signUp.pending]: (state) => {
      state.status = 'pending';
    },
    [signUp.fulfilled]: (state, action) => {
      state.error = null;
      state.user = action.payload.user;
      state.status = 'logged';
    },
    [signUp.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'rejected';
    },
  },
});

export default authReducer.reducer;
export const { cleanAuthState } = authReducer.actions;

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

export const isCookie = createAsyncThunk('auth/isCookie', async () => {
  const response = await FujiAPI.users.isCookie().catch((error) => {
    throw error.response.data;
  });
  return response.data;
});

export const editUser = createAsyncThunk('auth/editUser', async ({ key, value }) => {
  const response = await FujiAPI.users.editUser({ [key]: value }).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    cleanAuthState: (state) => (state = initialState),
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'logged';
    },
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
    [isCookie.pending]: (state) => {
      state.status = 'pending';
    },
    [isCookie.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.status = 'logged';
    },
    [isCookie.rejected]: (state) => {
      state.status = 'no-cookie';
    },
    [editUser.fulfilled]: (state, action) => {
      state.user[action.meta.arg.key] = action.meta.arg.value;
    },
  },
});

export default authReducer.reducer;
export const { cleanAuthState } = authReducer.actions;

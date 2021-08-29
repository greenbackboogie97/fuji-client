/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';

const intialActiveConversationState = {
  activeConversation: null,
  fetchedMessages: {
    fetchedMessages: null,
    status: 'idle',
    error: null,
  },
  status: 'idle',
  error: null,
};

const initialState = {
  conversations: {
    conversations: [],
    status: 'idle',
    error: null,
  },
  activeConversation: { ...intialActiveConversationState },
};

export const getConversations = createAsyncThunk('chat/getConversations', async () => {
  const response = await FujiAPI.chat.getConversations().catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const getConversation = createAsyncThunk('chat/getConversation', async (payload) => {
  const response = await FujiAPI.chat.getConversation(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const getMessages = createAsyncThunk('chat/getMessages', async (payload) => {
  const response = await FujiAPI.chat.getMessages(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    cleanChatReducer: (state) => (state = initialState),
  },
  extraReducers: {
    [getConversations.pending]: (state) => {
      state.conversations.status = 'pending';
    },
    [getConversations.fulfilled]: (state, action) => {
      state.conversations.conversations = action.payload;
      state.conversations.status = 'success';
    },
    [getConversations.rejected]: (state, action) => {
      state.conversations.error = action.error.message;
      state.conversations.status = 'rejected';
    },
    [getConversation.pending]: (state) => {
      state.activeConversation.status = 'pending';
    },
    [getConversation.fulfilled]: (state, action) => {
      state.activeConversation.activeConversation = action.payload.conversation;
      state.activeConversation.status = 'success';
    },
    [getConversation.rejected]: (state, action) => {
      state.activeConversation.error = action.error.message;
      state.activeConversation.status = 'rejected';
    },
    [getMessages.pending]: (state) => {
      state.activeConversation.fetchedMessages.status = 'pending';
    },
    [getMessages.fulfilled]: (state, action) => {
      state.activeConversation.fetchedMessages.fetchedMessages = action.payload;
      state.activeConversation.fetchedMessages.status = 'success';
    },
    [getMessages.rejected]: (state, action) => {
      state.activeConversation.fetchedMessages.error = action.error.message;
      state.activeConversation.fetchedMessages.status = 'rejected';
    },
  },
});

export default chatReducer.reducer;
export const { cleanChatReducer, cleanActiveConversation } = chatReducer.actions;

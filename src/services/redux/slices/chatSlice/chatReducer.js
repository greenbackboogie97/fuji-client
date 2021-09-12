/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FujiAPI from '../../../API/FujiAPI';
import { getContactsSockets } from '../../../socket';

const initialState = {
  contacts: {
    contacts: null,
    status: 'idle',
    socketStatus: 'idle',
  },
  activeConversation: {
    conversation: null,
    status: 'idle',
  },
};

export const getContacts = createAsyncThunk('chat/getContacts', async (payload) => {
  const friends = await FujiAPI.friends.getFriends(payload).catch((error) => {
    throw error.response.data;
  });
  const conversations = await FujiAPI.chat.getConversations().catch((error) => {
    throw error.response.data;
  });
  return {
    friends: friends.data.data.friends,
    conversations: conversations.data.data.conversations,
  };
});

export const getConversation = createAsyncThunk('chat/getConversation', async (payload) => {
  const response = await FujiAPI.chat.getConversation(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

export const createConversation = createAsyncThunk('chat/creatConversation', async (payload) => {
  const response = await FujiAPI.chat.createConversation(payload).catch((error) => {
    throw error.response.data;
  });
  return response.data.data;
});

const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    cleanChatState: (state) => (state = initialState),
    updateContacts: (state, action) => {
      state.contacts.contacts = action.payload;
      state.contacts.socketStatus = 'success';
    },
    addMessage: (state, action) => {
      const { conversation } = state.activeConversation;
      if (conversation) {
        conversation.messages.push(action.payload);
      }
    },
  },
  extraReducers: {
    [getContacts.pending]: (state) => {
      state.contacts.status = 'pending';
    },
    [getContacts.fulfilled]: (state, action) => {
      const { friends, conversations } = action.payload;
      const contacts = [];
      conversations.forEach((conversation) => {
        const participantsWithoutAuthUser = conversation.participants.filter(
          (participant) => participant._id !== action.meta.arg
        );
        const contact = { user: participantsWithoutAuthUser[0], conversation: conversation._id };
        contacts.push(contact);
      });

      const friendsWithoutConversation = friends.filter(
        (friend) => !contacts.some((contact) => contact.user._id === friend._id)
      );

      friendsWithoutConversation.forEach((friend) => {
        const contact = { user: friend, conversation: null };
        contacts.push(contact);
      });

      getContactsSockets(contacts);
      state.contacts.contacts = contacts;
      state.contacts.status = 'success';
    },
    [getConversation.pending]: (state) => {
      state.activeConversation.status = 'pending';
    },
    [getConversation.fulfilled]: (state, action) => {
      state.activeConversation.conversation = action.payload.conversation;
      state.activeConversation.status = 'success';
    },
    [createConversation.fulfilled]: (state, action) => {
      state.activeConversation.conversation = action.payload.conversation;
      state.activeConversation.status = 'success';
    },
  },
});

export default chatReducer.reducer;
export const { cleanChatState, updateContacts, addMessage } = chatReducer.actions;

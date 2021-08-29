import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice/authReducer';
import themeReducer from './slices/themeSlice/themeReducer';
import chatReducer from './slices/chatSlice/chatReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    chat: chatReducer,
  },
});

export default store;

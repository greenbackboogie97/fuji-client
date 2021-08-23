import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice/authReducer';
import themeReducer from './slices/themeSlice/themeReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;

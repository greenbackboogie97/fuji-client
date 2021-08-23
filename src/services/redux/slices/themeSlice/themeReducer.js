import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'light',
};

const themeReducer = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.type = action.payload;
    },
  },
});

export default themeReducer.reducer;
export const { setTheme } = themeReducer.actions;

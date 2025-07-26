import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  newMessageModal: false
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      console.log(JSON.stringify(state));

      state.darkMode = !state.darkMode;
    },
    toggleNewMessageModal: (state, actions) => {
      state.newMessageModal = actions.payload;
    },
  },
});

export const { toggleDarkMode, toggleNewMessageModal } = themeSlice.actions;
export default themeSlice.reducer;
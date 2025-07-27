import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  newMessageModal: false,
  newMessageModalUpdate: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {

      state.darkMode = !state.darkMode;
    },
    toggleNewMessageModal: (state, actions) => {
      state.newMessageModal = actions.payload;     
    },

    newMessageModalUpdateR: (state, action) => {
      state.newMessageModalUpdate = action.payload;
      state.newMessageModal = !!action.payload; // true if editing, false if null/undefined/false
    },

    clearMessageModalUpdate: (state) => {
      state.newMessageModalUpdate = null
    },
  },
});

export const { toggleDarkMode, toggleNewMessageModal, newMessageModalUpdateR, clearMessageModalUpdate } = themeSlice.actions;
export default themeSlice.reducer;
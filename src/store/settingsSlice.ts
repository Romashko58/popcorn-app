import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
   theme: 'dark' | 'light';
}

const savedTheme = localStorage.getItem('popcorn-theme') as 'dark' | 'light' | null;

const initialState: SettingsState = {
   theme: savedTheme || 'dark',
};

const settingsSlice = createSlice({
   name: 'settings',
   initialState,
   reducers: {
      toggleTheme(state) {
         state.theme = state.theme === 'dark' ? 'light' : 'dark';
         localStorage.setItem('popcorn-theme', state.theme);
      },
   },
});

export const { toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
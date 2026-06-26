import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NotesState {

   items: Record<string, string>;
}

const loadNotesFromStorage = (): Record<string, string> => {
   try {
      const saved = localStorage.getItem('movie_notes');
      return saved ? JSON.parse(saved) : {};
   } catch (error) {
      console.error('Failed to load notes from localStorage:', error);
      return {};
   }
};

const initialState: NotesState = {
   items: loadNotesFromStorage(),
};

const notesSlice = createSlice({
   name: 'notes',
   initialState,
   reducers: {

      saveNote: (state, action: PayloadAction<{ imdbID: string; text: string }>) => {
         const { imdbID, text } = action.payload;
         if (text.trim() === '') {
            delete state.items[imdbID];
         } else {
            state.items[imdbID] = text;
         }
         localStorage.setItem('movie_notes', JSON.stringify(state.items));
      },

      deleteNote: (state, action: PayloadAction<string>) => {
         const imdbID = action.payload;
         if (state.items[imdbID]) {
            delete state.items[imdbID];
            localStorage.setItem('movie_notes', JSON.stringify(state.items));
         }
      },
   },
});

export const { saveNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
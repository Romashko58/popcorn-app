import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NotesState {

   items: Record<string, string[]>;
}

const loadNotesFromStorage = (): Record<string, string[]> => {
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
         if (text.trim() === '') return;
         if (!state.items[imdbID]) {
            state.items[imdbID] = [];
         }
         state.items[imdbID].push(text);
         localStorage.setItem('movie_notes', JSON.stringify(state.items));
      },

      updateNote: (state, action: PayloadAction<{ imdbID: string; index: number; text: string }>) => {
         const { imdbID, index, text } = action.payload;
         if (state.items[imdbID] && text.trim() !== '') {
            state.items[imdbID][index] = text;
            localStorage.setItem('movie_notes', JSON.stringify(state.items));
         }
      },

      deleteNote: (state, action: PayloadAction<{ imdbID: string; index: number }>) => {
         const { imdbID, index } = action.payload;
         if (state.items[imdbID]) {
            state.items[imdbID].splice(index, 1);
            if (state.items[imdbID].length === 0) {
               delete state.items[imdbID];
            }
            localStorage.setItem('movie_notes', JSON.stringify(state.items));
         }
      },
   },
});

export const { saveNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
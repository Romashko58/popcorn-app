import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export type MovieType = 'movie' | 'series' | 'episode' | 'game' | ''
interface SearchState {
   query: string;
   type: MovieType;
   year: string;
}

const initialState: SearchState = {
   query: '',
   type: '',
   year: '',
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      setSearchQuery: (state, action: PayloadAction<string>) => {
         state.query = action.payload;
      },
      setMovieType: (state, action: PayloadAction<MovieType>) => {
         state.type = action.payload;
      },
      setMovieYear: (state, action: PayloadAction<string>) => {
         state.year = action.payload;
      },
      resetFilters: (state) => {
         state.type = '';
         state.year = '';
      },
   },
});

export const { setSearchQuery, setMovieType, setMovieYear, resetFilters } = searchSlice.actions;
export default searchSlice.reducer;
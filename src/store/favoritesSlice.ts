import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface FavoriteMovie {
   imdbID: string;
   Title: string;
   Year: string;
   Poster: string;
   Type: string;
}

interface FavoritesState {
   items: FavoriteMovie[];
}

const loadFavoritesFromStorage = (): FavoriteMovie[] => {
   try {
      const saved = localStorage.getItem('movie_favorites');
      return saved ? JSON.parse(saved) : [];
   } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
      return [];
   }
};

const initialState: FavoritesState = {
   items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
   name: 'favorites',
   initialState,
   reducers: {
      addToFavorites: (state, action: PayloadAction<FavoriteMovie>) => {
         const exists = state.items.some(item => item.imdbID === action.payload.imdbID);
         if (!exists) {
            state.items.push(action.payload);
            localStorage.setItem('movie_favorites', JSON.stringify(state.items));
         }
      },
      removeFromFavorites: (state, action: PayloadAction<string>) => {
         state.items = state.items.filter(item => item.imdbID !== action.payload);
         localStorage.setItem('movie_favorites', JSON.stringify(state.items));
      },
   },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
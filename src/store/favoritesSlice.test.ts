import favoritesReducer, { addToFavorites, removeFromFavorites, type FavoriteMovie } from './favoritesSlice';
import { describe, it, expect, beforeEach } from 'vitest';
//Имитируем localStorage для тестового окружения
const localStorageMock = (() => {
   let store: Record<string, string> = {};
   return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value.toString(); },
      clear: () => { store = {}; }
   };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('favoritesSlice', () => {
   const mockMovie: FavoriteMovie = {
      imdbID: 'tt12345',
      Title: 'Spider-Man: Far From Home',
      Year: '2019',
      Poster: 'https://example.com/poster.jpg',
      Type: 'movie'
   };

   beforeEach(() => {
      localStorage.clear();
   });

   //Тест начального состояния
   it('should return the initial state when passed an empty action', () => {
      const result = favoritesReducer(undefined, { type: '' });
      expect(result).toEqual({ items: [] });
   });

   //Тест добавления в избранное (addToFavorites)
   it('should handle adding a movie to favorites', () => {
      const initialState = { items: [] };

      const nextState = favoritesReducer(initialState, addToFavorites(mockMovie));

      expect(nextState.items).toHaveLength(1);
      expect(nextState.items[0]).toEqual(mockMovie);
   });

   //Тест игнорирования дубликатов при добавлении
   it('should not add a movie if it already exists in favorites', () => {
      const initialState = { items: [mockMovie] };

      const nextState = favoritesReducer(initialState, addToFavorites(mockMovie));

      expect(nextState.items).toHaveLength(1);
   });

   //Тест удаления из избранного (removeFromFavorites)
   it('should handle removing a movie from favorites by id', () => {
      const initialState = { items: [mockMovie] };

      const nextState = favoritesReducer(initialState, removeFromFavorites(mockMovie.imdbID));

      expect(nextState.items).toHaveLength(0);
   });
});
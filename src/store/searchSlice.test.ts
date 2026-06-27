import { describe, it, expect } from 'vitest';
import searchReducer, {
   setSearchQuery,
   setMovieType,
   setMovieYear,
   resetFilters,
   type MovieType
} from './searchSlice';

describe('searchSlice', () => {
   const initialState = {
      query: '',
      type: '' as MovieType,
      year: '',
   };

   //Тест начального состояния
   it('should return the initial state when passed an empty action', () => {
      expect(searchReducer(undefined, { type: '' })).toEqual(initialState);
   });

   //Тест изменения поискового запроса (query)
   it('should handle setSearchQuery', () => {
      const nextState = searchReducer(initialState, setSearchQuery('Naruto'));
      expect(nextState.query).toBe('Naruto');
   });

   //Тест изменения типа контента (type)
   it('should handle setMovieType', () => {
      const nextState = searchReducer(initialState, setMovieType('series'));
      expect(nextState.type).toBe('series');
   });

   //Тест изменения года (year)
   it('should handle setMovieYear', () => {
      const nextState = searchReducer(initialState, setMovieYear('2024'));
      expect(nextState.year).toBe('2024');
   });

   //Тест сброса фильтров (resetFilters)
   it('should reset type and year filters, but keep the query', () => {
      const modifiedState = {
         query: 'Batman',
         type: 'movie' as MovieType,
         year: '2022',
      };

      const nextState = searchReducer(modifiedState, resetFilters());

      expect(nextState.type).toBe('');
      expect(nextState.year).toBe('');
      expect(nextState.query).toBe('Batman');
   });
});
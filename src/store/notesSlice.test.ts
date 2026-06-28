import notesReducer, { saveNote, updateNote, deleteNote } from './notesSlice';
import { describe, it, expect, beforeEach } from 'vitest';

//Имитируем localStorage
const localStorageMock = (() => {
   let store: Record<string, string> = {};
   return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value.toString(); },
      clear: () => { store = {}; }
   };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('notesSlice', () => {

   beforeEach(() => {
      localStorage.clear();
   });

   //Тест начального состояния
   it('should return the initial state when passed an empty action', () => {
      const result = notesReducer(undefined, { type: '' });
      expect(result).toEqual({ items: {} });
   });

   //Тест добавления первой заметки
   it('should add a new note to a movie that has no notes yet', () => {
      const initialState = { items: {} };
      const payload = { imdbID: 'tt1234567', text: 'Первая классная серия!' };

      const nextState = notesReducer(initialState, saveNote(payload));

      expect(nextState.items['tt1234567']).toEqual(['Первая классная серия!']);
   });

   //Тест добавления второй заметки в массив
   it('should push a second note to the existing array for the same movie', () => {
      const initialState = {
         items: { 'tt1234567': ['Первая заметка'] }
      };
      const payload = { imdbID: 'tt1234567', text: 'Вторая мысль' };

      const nextState = notesReducer(initialState, saveNote(payload));

      expect(nextState.items['tt1234567']).toEqual(['Первая заметка', 'Вторая мысль']);
   });

   //Тест редактирования (updateNote)
   it('should update a specific note by its index', () => {
      const initialState = {
         items: { 'tt1234567': ['Заметка 1', 'Заметка 2'] }
      };
      const payload = { imdbID: 'tt1234567', index: 1, text: 'Измененный текст' };

      const nextState = notesReducer(initialState, updateNote(payload));

      expect(nextState.items['tt1234567'][1]).toBe('Измененный текст');
   });

   //Тест удаления конкретной заметки
   it('should delete a note by index and keep the rest', () => {
      const initialState = {
         items: { 'tt1234567': ['Заметка 1', 'Заметка 2'] }
      };

      const nextState = notesReducer(initialState, deleteNote({ imdbID: 'tt1234567', index: 0 }));

      expect(nextState.items['tt1234567']).toEqual(['Заметка 2']);
   });

   //Тест полного удаления ключа, если массив стал пустым
   it('should completely remove the movie key if its notes array becomes empty', () => {
      const initialState = {
         items: { 'tt1234567': ['Единственная заметка'] }
      };

      const nextState = notesReducer(initialState, deleteNote({ imdbID: 'tt1234567', index: 0 }));

      expect(nextState.items['tt1234567']).toBeUndefined();
   });
});
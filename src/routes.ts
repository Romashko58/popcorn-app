import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './MainLayout.tsx';
import { SearchPage } from './pages/SearchPage';
import { MoviePage } from './pages/MoviePage';
import { FavoritesPage } from './pages/FavoritesPage';

export const router = createBrowserRouter([
   {
      path: '/',
      Component: MainLayout,
      children: [
         {
            index: true,
            Component: SearchPage,
         },
         {
            path: 'movies/:id',
            Component: MoviePage,
         },
         {
            path: 'favorites',
            Component: FavoritesPage,
         },

      ],
   },
]);
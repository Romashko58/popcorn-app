import { useAppSelector } from '../hooks/storeHooks';
import { MovieCard } from '../components/MovieCard';
import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {

   const favoriteMovies = useAppSelector((state) => state.favorites.items);

   return (
      <div className={styles.container}>
         <h2 className={styles.pageTitle}>My Favorites</h2>

         {favoriteMovies.length === 0 ? (
            <div className={styles.emptyState}>
               <p>Your favorites list is empty.</p>
               <p className={styles.subText}>Heart some movies or series to see them here!</p>
            </div>
         ) : (
            <div className={styles.movieGrid}>
               {favoriteMovies.map((movie) => (
                  <MovieCard
                     key={movie.imdbID}
                     imdbID={movie.imdbID}
                     title={movie.Title}
                     year={movie.Year}
                     poster={movie.Poster}
                     type={movie.Type}
                  />
               ))}
            </div>
         )}
      </div>
   );
};
import { useAppSelector } from '../hooks/storeHooks';
import { useSearchMoviesQuery } from '../api/omdbApi';
import { MovieCard } from '../components/MovieCard';
import styles from './SearchPage.module.css';

export const SearchPage = () => {
   const searchQuery = useAppSelector((state) => state.search.query);
   const isSearching = searchQuery.trim() !== '';

   const currentSearch = isSearching ? searchQuery : 'series';

   const { data, isLoading, isError } = useSearchMoviesQuery(currentSearch);

   if (isLoading) {
      return (
         <div className={styles.center}>
            <div className={styles.spinner}></div>
            <p>Loading movies...</p>
         </div>
      );
   }

   if (isError) {
      return (
         <div className={styles.center}>
            <p className={styles.errorText}>Something went wrong.</p>
         </div>
      );
   }

   const movies = data?.Search || [];

   return (
      <div className={styles.container}>
         <h2 className={styles.pageTitle}>
            {!isSearching ? 'Explore Movies' : `Search results for: "${searchQuery}"`}
         </h2>

         {movies.length === 0 ? (
            <div className={styles.center}>
               <p>No movies found.</p>
            </div>
         ) : (
            <div className={styles.movieGrid}>
               {movies.map((movie) => (
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
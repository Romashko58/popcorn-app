import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { useSearchMoviesQuery } from '../api/omdbApi';
import { MovieCard } from '../components/MovieCard';
import styles from './SearchPage.module.css';
import { useEffect, useState } from 'react';
import { resetFilters, setMovieType, setMovieYear, type MovieType } from '../store/searchSlice';
import { useDebounce } from '../hooks/debounce';


export const SearchPage = () => {
   const dispatch = useAppDispatch();
   const { query: searchQuery, type: movieType, year: movieYear } = useAppSelector((state) => state.search);
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
   const isSearching = searchQuery.trim() !== '';

   const currentSearch = debouncedSearchQuery.trim() !== '' ? debouncedSearchQuery : 'series';

   const [page, setPage] = useState(1);

   useEffect(() => {
      setPage(1);
   }, [debouncedSearchQuery, movieType, movieYear]);


   const { data, isLoading, isError, isFetching } = useSearchMoviesQuery({
      title: currentSearch,
      page,
      type: movieType,
      year: movieYear,
   });
   console.log("Текущее состояние страницы:", page, "Идет ли загрузка (isFetching):", isFetching);
   if (isLoading && page === 1) {
      return (
         <div className={styles.center}>
            <div className={styles.spinner}></div>
            <p>Loading movies...</p>
         </div>
      );
   }

   if (isError && page === 1) {
      return (
         <div className={styles.center}>
            <p className={styles.errorText}>Something went wrong.</p>
         </div>
      );
   }

   const movies = data?.Search || [];
   const totalResults = data?.totalResults ? parseInt(data.totalResults, 10) : 0;
   const hasMore = movies.length < totalResults;

   return (
      <div className={styles.container}>

         <div className={styles.filterWrapper}>
            <div className={styles.filterGroup}>
               <label htmlFor="type-select">Type:</label>
               <select
                  id="type-select"
                  value={movieType}
                  onChange={(e) => dispatch(setMovieType(e.target.value as MovieType))}
                  className={styles.filterSelect}
               >
                  <option value="">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="series">Series</option>
                  <option value="game">Games</option>
               </select>
            </div>

            <div className={styles.filterGroup}>
               <label htmlFor="year-input">Year:</label>
               <input
                  id="year-input"
                  type="text"
                  placeholder="e.g. 2024"
                  maxLength={4}
                  value={movieYear}
                  onChange={(e) => {
                     const val = e.target.value.replace(/\D/g, '');
                     dispatch(setMovieYear(val));
                  }}
                  className={styles.filterInput}
               />
            </div>

            {(movieType || movieYear) && (
               <button
                  className={styles.resetBtn}
                  onClick={() => {
                     dispatch(resetFilters());
                  }}
               >
                  Reset
               </button>
            )}
         </div>

         <h2 className={styles.pageTitle}>
            {!isSearching ? 'Explore Movies' : `Search results for: "${searchQuery}"`}
         </h2>

         {movies.length === 0 ? (
            <div className={styles.center}>
               <p>No movies found.</p>
            </div>
         ) : (
            <>
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

               {hasMore && (
                  <div className={styles.buttonWrapper}>
                     <button
                        className={styles.showMoreBtn}
                        disabled={isFetching}
                        onClick={() => setPage((prev) => prev + 1)}
                     >
                        {isFetching ? 'Loading next page...' : 'Show more'}
                     </button>
                  </div>
               )}
            </>
         )
         }
      </div >
   );
};
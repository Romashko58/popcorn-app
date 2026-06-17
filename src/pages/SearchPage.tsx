import { useAppSelector } from '../hooks/storeHooks';
import { useSearchMoviesQuery } from '../api/omdbApi';
import { MovieCard } from '../components/MovieCard';
import styles from './SearchPage.module.css';
import { useEffect, useState } from 'react';

export const SearchPage = () => {
   const searchQuery = useAppSelector((state) => state.search.query);
   const isSearching = searchQuery.trim() !== '';

   const currentSearch = isSearching ? searchQuery : 'series';

   const [page, setPage] = useState(1);

   useEffect(() => {
      setPage(1);
   }, [currentSearch]);


   const { data, isLoading, isError, isFetching } = useSearchMoviesQuery({
      title: currentSearch,
      page
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
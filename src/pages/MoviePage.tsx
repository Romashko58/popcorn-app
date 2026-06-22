import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../api/omdbApi';
import { MdFavoriteBorder, MdArrowBack, MdStar } from 'react-icons/md';
import styles from './MoviePage.module.css';

export const MoviePage = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   const { data: movie, error, isLoading } = useGetMovieByIdQuery(
      id ? { id, plot: 'full' } : { id: '' }
   );

   if (isLoading) {
      return (
         <div className={styles.center}>
            <div className={styles.spinner}></div>
            <p>Loading movie details...</p>
         </div>
      );
   }

   if (error || !movie || movie.Response === 'False') {
      return (
         <div className={styles.center}>
            <p className={styles.errorText}>Movie not found or API error occurred.</p>
            <button onClick={() => navigate('/')} className={styles.backBtn}>
               <MdArrowBack size={20} /> Back to Search
            </button>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <MdArrowBack size={20} /> Back
         </button>

         <div className={styles.mainInfo}>
            <div className={styles.posterBlock}>
               <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                  alt={movie.Title}
                  className={styles.poster}
               />
            </div>

            <div className={styles.detailsBlock}>
               <h1 className={styles.title}>{movie.Title}</h1>

               <div className={styles.metaRow}>
                  <span className={styles.rating}>
                     <MdStar size={22} color="#ffb400" /> {movie.imdbRating || 'N/A'}
                  </span>
                  <span className={styles.year}>{movie.Year}</span>
                  <span className={styles.runtime}>{movie.Runtime}</span>
               </div>

               <div className={styles.infoTable}>
                  <p><strong>Genre:</strong> {movie.Genre}</p>
                  <p><strong>Director:</strong> {movie.Director}</p>
                  <p><strong>Writer:</strong> {movie.Writer}</p>
                  <p><strong>Actors:</strong> {movie.Actors}</p>
                  <p><strong>Country:</strong> {movie.Country}</p>
                  <p><strong>Awards:</strong> {movie.Awards}</p>
               </div>

               <button className={styles.favoriteBtn}>
                  <MdFavoriteBorder size={20} /> Add to Favorites
               </button>
            </div>
         </div>

         <div className={styles.plotBlock}>
            <h3 className={styles.sectionTitle}>Synopsis</h3>
            <p className={styles.plotText}>{movie.Plot}</p>
         </div>

         <div className={styles.notesSection}>
            <h3 className={styles.sectionTitle}>Personal Notes & Reviews</h3>
            <div className={styles.stubForm}>
               <textarea
                  placeholder="Write your review or notes about this movie here..."
                  className={styles.textareaStub}
                  disabled
               />
               <button className={styles.addNoteBtnStub} disabled>
                  Add Note
               </button>
            </div>
         </div>
      </div>
   );
};
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetMovieByIdQuery } from '../api/omdbApi';
import { MdFavoriteBorder, MdFavorite, MdArrowBack, MdStar, MdDelete, MdEdit } from 'react-icons/md';
import styles from './MoviePage.module.css';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import { saveNote, deleteNote, updateNote } from '../store/notesSlice';

export const MoviePage = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const { data: movie, error, isLoading } = useGetMovieByIdQuery(
      id ? { id, plot: 'full' } : { id: '' }
   );

   const isFavorite = useAppSelector((state) =>
      state.favorites.items.some((item) => item.imdbID === id)
   );

   const savedNote = useAppSelector((state) => state.notes.items[id || ''] || []);
   const [noteText, setNoteText] = useState('');
   const [editIndex, setEditIndex] = useState<number | null>(null);
   const handleFavoriteToggle = () => {
      if (!movie) return;

      if (isFavorite) {
         dispatch(removeFromFavorites(movie.imdbID));
      } else {
         dispatch(addToFavorites({
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            Type: movie.Type
         }));
      }
   };

   const handleSaveNote = () => {
      if (!id || !noteText.trim()) return;

      if (editIndex !== null) {
         dispatch(updateNote({ imdbID: id, index: editIndex, text: noteText }));
         setEditIndex(null);
      } else {
         dispatch(saveNote({ imdbID: id, text: noteText }));
      }

      setNoteText('');
   };

   const handleDeleteNote = (index: number) => {
      if (id && window.confirm('Are you sure you want to delete your note?')) {
         dispatch(deleteNote({ imdbID: id, index }));
      }
   };

   const handleCancelEdit = () => {
      setNoteText('');
      setEditIndex(null);
   };

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

               <button className={`${styles.favoriteBtn} ${isFavorite ? styles.activeFav : ''}`} onClick={handleFavoriteToggle}>
                  {isFavorite ? (
                     <>
                        <MdFavorite size={20} color="#ff4d4d" /> Remove from Favorites
                     </>
                  ) : (
                     <>
                        <MdFavoriteBorder size={20} /> Add to Favorites
                     </>
                  )}
               </button>
            </div>
         </div>

         <div className={styles.plotBlock}>
            <h3 className={styles.sectionTitle}>Synopsis</h3>
            <p className={styles.plotText}>{movie.Plot}</p>
         </div>

         <div className={styles.notesSection}>
            <h3 className={styles.sectionTitle}>Personal Notes & Reviews</h3>

            <div className={styles.noteForm}>
               <textarea
                  placeholder={editIndex !== null ? "Edit your note..." : "Write a new review or note about this movie..."}
                  className={styles.textarea}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  maxLength={1000}
               />
               <div className={styles.btnRow}>
                  <button
                     className={styles.saveNoteBtn}
                     onClick={handleSaveNote}
                     disabled={!noteText.trim()}
                  >
                     {editIndex !== null ? 'Save Changes' : 'Add Note'}
                  </button>
                  {editIndex !== null && (
                     <button className={styles.cancelBtn} onClick={handleCancelEdit}>
                        Cancel
                     </button>
                  )}
               </div>
            </div>

            {savedNote.length > 0 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                  {savedNote.map((note, index) => (
                     <div key={index} className={styles.displayNoteBlock} style={{ opacity: editIndex === index ? 0.6 : 1 }}>
                        <p className={styles.noteContent}>{note}</p>
                        <div className={styles.noteActions}>
                           <button
                              className={styles.actionBtn}
                              onClick={() => {
                                 setNoteText(note);
                                 setEditIndex(index);
                              }}
                              title="Edit note"
                              disabled={editIndex !== null}
                           >
                              <MdEdit size={18} /> Edit
                           </button>
                           <button
                              className={`${styles.actionBtn} ${styles.deleteBtnColor}`}
                              onClick={() => handleDeleteNote(index)}
                              title="Delete note"
                              disabled={editIndex !== null}
                           >
                              <MdDelete size={18} /> Delete
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <p style={{ color: '#888', fontStyle: 'italic', marginTop: '15px' }}>
                  No notes added yet. Be the first to share your thoughts!
               </p>
            )}
         </div>
      </div>
   );
};
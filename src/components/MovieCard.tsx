
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import styles from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';

interface MovieCardProps {
   title: string;
   year: string;
   poster: string;
   imdbID: string;
   type: string;
}

export const MovieCard = ({ title, year, poster, type, imdbID }: MovieCardProps) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   // Проверяем, есть ли этот фильм в избранном
   const isFavorite = useAppSelector((state) =>
      state.favorites.items.some((item) => item.imdbID === imdbID)
   );

   const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // чтобы не переходить на страницу фильма
      if (isFavorite) {
         dispatch(removeFromFavorites(imdbID));
      } else {
         dispatch(addToFavorites({ imdbID, Title: title, Year: year, Poster: poster, Type: type }));
      }
   };

   return (
      <div className={`${styles.card} appTransition`}
         onClick={() => navigate(`/movies/${imdbID}`)}
         style={{ cursor: 'pointer' }}>
         <div className={styles.posterWrapper}>
            <img src={poster} alt={title} className={styles.poster} />
            <span className={styles.badge}>{type}</span>
            <button className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
               title={isFavorite ? "Remove from favorites" : "Add to favorites"}
               onClick={handleFavoriteClick}>
               {isFavorite ? (
                  <MdFavorite size={22} color="#ff4d4d" />
               ) : (
                  <MdFavoriteBorder size={22} />
               )}
            </button>
         </div>
         <div className={styles.info}>
            <h3 className={styles.title} title={title}>{title}</h3>
            <span className={styles.year}>{year}</span>
         </div>
      </div>
   );
};
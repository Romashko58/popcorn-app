
import { MdFavoriteBorder } from 'react-icons/md';
import styles from './MovieCard.module.css';

interface MovieCardProps {
   title: string;
   year: string;
   poster: string;
   imdbID: string;
   type: string;
}

export const MovieCard = ({ title, year, poster, type }: MovieCardProps) => {

   return (
      <div className={`${styles.card} appTransition`}>
         <div className={styles.posterWrapper}>
            <img src={poster} alt={title} className={styles.poster} />
            <span className={styles.badge}>{type}</span>
            <button className={styles.favoriteBtn} title="Add to favorites">
               <MdFavoriteBorder size={22} />
            </button>
         </div>
         <div className={styles.info}>
            <h3 className={styles.title} title={title}>{title}</h3>
            <span className={styles.year}>{year}</span>
         </div>
      </div>
   );
};
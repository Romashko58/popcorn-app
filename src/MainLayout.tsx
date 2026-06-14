
import { Outlet, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import { MdSearch, MdFavorite, MdWbSunny, MdNightsStay } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { toggleTheme } from './store/settingsSlice';
import { setSearchQuery } from './store/searchSlice';


export const MainLayout = () => {
   const dispatch = useAppDispatch();
   const theme = useAppSelector((state) => state.settings.theme);
   const themeClass = theme === 'dark' ? styles.themeDark : styles.themeLight;
   const searchQuery = useAppSelector((state) => state.search.query);

   return (
      <div className={`${styles.appWrapper} ${themeClass} appTransition`}>

         <header className={`${styles.header} appTransition`}>
            <div className={styles.logo}>
               <span style={{ fontSize: '28px', lineHeight: '1' }}>🍿</span>
               <span>Popcorn</span>
            </div>

            <input
               type="text"
               placeholder="Search..."
               className={`${styles.searchBar} appTransition`}
               value={searchQuery}
               onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />

            <button onClick={() => dispatch(toggleTheme())} className={styles.themeToggle} >
               {theme === 'dark' ? (
                  <MdWbSunny style={{ color: '#ffb703' }} />
               ) : (
                  <MdNightsStay style={{ color: '#a69296' }} />
               )}
            </button>
         </header>

         <aside className={`${styles.sidebar} appTransition`}>
            <NavLink
               to="/"
               className={`${styles.navLink} appTransition`}
               style={({ isActive }) => isActive ? {
                  backgroundColor: 'rgba(229, 9, 20, 0.12)',
                  color: '#e50914',
                  fontWeight: '700'
               } : {}}
            >
               <MdSearch size={24} />
               <span>Search</span>
            </NavLink>

            <NavLink
               to="/favorites"
               className={`${styles.navLink} appTransition`}
               style={({ isActive }) => isActive ? {
                  backgroundColor: 'rgba(229, 9, 20, 0.12)',
                  color: '#e50914',
                  fontWeight: '700'
               } : {}}
            >
               <MdFavorite size={24} />
               <span>Favorites</span>
            </NavLink>
         </aside>

         <main className={styles.mainContent}>
            <Outlet />
         </main>

      </div>
   );
};
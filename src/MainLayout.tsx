import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

export const MainLayout = () => {
   const [theme, setTheme] = useState<'dark' | 'light'>('dark');
   const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
   const themeClass = theme === 'dark' ? styles.themeDark : styles.themeLight;

   return (
      <div className={`appTransition ${styles.appWrapper} ${themeClass}`}>

         <button onClick={toggleTheme} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, padding: '10px', cursor: 'pointer' }}>
            Тема: {theme}
         </button>


         <main style={{ width: '100%', padding: '20px' }}>
            <Outlet />
         </main>
      </div>
   );
};
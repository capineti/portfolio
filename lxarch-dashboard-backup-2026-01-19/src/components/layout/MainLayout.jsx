import { useState, useEffect, useRef } from 'react';
import './MainLayout.css';

export const MainLayout = ({ children, currentView, onNavigate, onLogout }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      setIsScrolled(mainElement.scrollTop > 10);
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="layout-root" data-theme={theme}>
      <header className={`layout-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-logo">
            <img src="/lxarch-logo.svg" alt="LxArch Logo" className="logo-img" />
          </div>
          <div className="header-controls">
            <div className="user-profile">
              <div className="user-avatar-img"></div>
              <div className="user-info">
                <span className="user-name">Caterina</span>
                <span className="user-role">Admin</span>
              </div>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Cerrar Sesión">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 16L21 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </header>

      <main
        ref={mainRef}
        className={`layout-main ${currentView === 'dashboard' ? 'dashboard-bg' : ''}`}
      >
        <div className="main-content full-height">
          {children}
        </div>
      </main>
    </div>
  );
};

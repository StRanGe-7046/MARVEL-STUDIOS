import { useState, useEffect } from 'react';

export default function Navbar({ onWatchTrailer, activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'doomsday' || target === 'infinity-saga') {
      if (onNavigate) onNavigate(target);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`nav-bar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={(e) => handleLinkClick(e, 'doomsday')}>
          AVENGERS: DOOMSDAY
        </div>

        <ul className="nav-links">
          {activePage === 'infinity-saga' ? (
            <>
              <li>
                <a href="#doomsday" onClick={(e) => handleLinkClick(e, 'doomsday')} style={{ color: 'var(--primary-fixed)' }}>
                  ← BACK TO DOOMSDAY
                </a>
              </li>
              <li>
                <a href="#infinity-saga" className="active">
                  INFINITY SAGA
                </a>
              </li>
              <li>
                <a href="#phase-1" onClick={(e) => handleLinkClick(e, 'phase-1')}>
                  PHASES
                </a>
              </li>
              <li>
                <a href="#movie-1" onClick={(e) => handleLinkClick(e, 'movie-1')}>
                  MOVIES
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#hero" className="active" onClick={(e) => handleLinkClick(e, 'hero')}>
                  DOOMSDAY
                </a>
              </li>
              <li>
                <a href="#infinity-saga" onClick={(e) => handleLinkClick(e, 'infinity-saga')}>
                  INFINITY SAGA PAGE
                </a>
              </li>
              <li>
                <a href="#cast" onClick={(e) => handleLinkClick(e, 'cast')}>
                  CAST
                </a>
              </li>
            </>
          )}
        </ul>

        {onWatchTrailer && (
          <button className="nav-btn" onClick={onWatchTrailer} id="nav-watch-trailer">
            Watch Trailer
          </button>
        )}
      </div>
    </nav>
  );
}



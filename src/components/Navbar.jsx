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
    if (target === 'doomsday' || target === 'infinity-saga' || target === 'watch-guide') {
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
          <li>
            <a
              href="#doomsday"
              className={activePage === 'doomsday' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'doomsday')}
            >
              DOOMSDAY
            </a>
          </li>

          <li>
            <a
              href="#infinity-saga"
              className={activePage === 'infinity-saga' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'infinity-saga')}
            >
              INFINITY SAGA
            </a>
          </li>

          <li>
            <a
              href="#watch-guide"
              className={activePage === 'watch-guide' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'watch-guide')}
              style={{ color: activePage === 'watch-guide' ? '#7df4ff' : undefined }}
            >
              WATCH GUIDE
            </a>
          </li>
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




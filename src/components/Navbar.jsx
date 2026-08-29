import { useState, useEffect } from 'react';

export default function Navbar({ onWatchTrailer }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('infinity');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'DOOMSDAY', targetId: 'hero' },
    { label: 'INFINITY SAGA', targetId: 'infinity-saga' },
    { label: 'PHASES', targetId: 'phase-1' },
    { label: 'MOVIES', targetId: 'movie-1' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`nav-bar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          AVENGERS: DOOMSDAY
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={`#${item.targetId}`}
                className={activeSection === item.targetId ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.targetId)}
              >
                {item.label}
              </a>
            </li>
          ))}
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


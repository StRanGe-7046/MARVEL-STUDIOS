import { useState, useEffect } from 'react';

export default function Navbar({ onWatchTrailer }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('synopsis');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['synopsis', 'cast', 'intel', 'countdown'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  return (
    <nav className={`nav-bar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo">AVENGERS: DOOMSDAY</div>
        <ul className="nav-links">
          {['Synopsis', 'Cast', 'Intel', 'Countdown'].map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={activeSection === item.toLowerCase() ? 'active' : ''}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-btn" onClick={onWatchTrailer} id="nav-watch-trailer">
          Watch Trailer
        </button>
      </div>
    </nav>
  );
}

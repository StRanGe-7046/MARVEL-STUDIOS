import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import DoctorSection from './components/DoctorSection';
import CastSection from './components/CastSection';
import Timeline from './components/Timeline';
import MediaSection from './components/MediaSection';
import Footer from './components/Footer';
import TrailerModal from './components/TrailerModal';
import MarvelIntro from './components/MarvelIntro';
import InfinityHero from './components/InfinityTimeline/InfinityHero';
import InfinityTimeline from './components/InfinityTimeline/InfinityTimeline';
import InfinityFooter from './components/InfinityTimeline/InfinityFooter';
import WatchGuide from './pages/WatchGuide/WatchGuide';

// Load Google Material Symbols
const materialSymbolsLink = document.createElement('link');
materialSymbolsLink.rel = 'stylesheet';
materialSymbolsLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
document.head.appendChild(materialSymbolsLink);

function App() {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#watch-guide') return 'watch-guide';
    if (hash === '#infinity-saga') return 'infinity-saga';
    return 'doomsday';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#watch-guide') {
        setActivePage('watch-guide');
      } else if (hash === '#infinity-saga') {
        setActivePage('infinity-saga');
      } else {
        setActivePage('doomsday');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageName) => {
    setActivePage(pageName);
    window.location.hash = `#${pageName}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTrailer = () => setTrailerOpen(true);
  const closeTrailer = () => setTrailerOpen(false);

  const scrollToCast = () => {
    document.getElementById('cast')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {introOpen && <MarvelIntro onDismiss={() => setIntroOpen(false)} />}
      <Navbar
        onWatchTrailer={openTrailer}
        activePage={activePage}
        onNavigate={navigateTo}
      />

      <main>
        {activePage === 'watch-guide' ? (
          /* SEPARATE PAGE: MCU WATCH GUIDE */
          <WatchGuide onNavigate={navigateTo} />
        ) : activePage === 'infinity-saga' ? (
          /* SEPARATE PAGE: THE INFINITY SAGA */
          <div className="infinity-saga-page fade-in-up">
            <InfinityHero />
            <InfinityTimeline />
            <InfinityFooter />
          </div>
        ) : (
          /* MAIN PAGE: DOOMSDAY */
          <div className="doomsday-main-page fade-in-up">
            <div id="hero">
              <Hero onWatchTrailer={openTrailer} onExploreCast={scrollToCast} />
            </div>
            <Countdown />
            <DoctorSection />
            <CastSection />
            <Timeline onNavigateSaga={navigateTo} />
            <MediaSection onWatchTrailer={openTrailer} />
          </div>
        )}
      </main>

      <Footer />
      <TrailerModal isOpen={trailerOpen} onClose={closeTrailer} />
    </>
  );
}

export default App;




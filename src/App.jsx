import { useState } from 'react';
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

// Load Google Material Symbols
const materialSymbolsLink = document.createElement('link');
materialSymbolsLink.rel = 'stylesheet';
materialSymbolsLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
document.head.appendChild(materialSymbolsLink);

function App() {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);

  const openTrailer = () => setTrailerOpen(true);
  const closeTrailer = () => setTrailerOpen(false);

  const scrollToCast = () => {
    document.getElementById('cast')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {introOpen && <MarvelIntro onDismiss={() => setIntroOpen(false)} />}
      <Navbar onWatchTrailer={openTrailer} />
      <Hero onWatchTrailer={openTrailer} onExploreCast={scrollToCast} />
      <Countdown />
      <DoctorSection />
      <CastSection />
      <Timeline />
      <MediaSection onWatchTrailer={openTrailer} />
      <Footer />
      <TrailerModal isOpen={trailerOpen} onClose={closeTrailer} />
    </>
  );
}

export default App;

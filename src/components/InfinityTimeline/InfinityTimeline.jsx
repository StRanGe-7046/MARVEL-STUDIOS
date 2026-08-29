import { useState, useEffect, useRef } from 'react';
import { infinitySagaMovies, phaseInfo } from '../../data/infinitySaga';
import MovieCard from './MovieCard';
import AboutMovieBlock from './AboutMovieBlock';
import TimelineNode from './TimelineNode';
import PhaseDivider from './PhaseDivider';
import MovieModal from './MovieModal';
import ProgressIndicator from './ProgressIndicator';

export default function InfinityTimeline() {
  const [activeMovieId, setActiveMovieId] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let currentActiveId = 1;
      let minDistance = Infinity;

      infinitySagaMovies.forEach((movie) => {
        const el = movieRefs.current[movie.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            currentActiveId = movie.id;
          }
        }
      });

      setActiveMovieId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const navigateModal = (newId) => {
    const target = infinitySagaMovies.find((m) => m.id === newId);
    if (target) setSelectedMovie(target);
  };

  return (
    <section id="infinity-saga" className="infinity-timeline-section">
      <ProgressIndicator activeMovieNumber={activeMovieId} totalMovies={infinitySagaMovies.length} />

      <div className="timeline-container">
        {/* Continuous Central Timeline Line */}
        <div className="central-timeline-track">
          <div className="timeline-glow-line" />
        </div>

        {/* Phase One Header */}
        <PhaseDivider phaseKey={1} info={phaseInfo[1]} />

        <div className="timeline-items-flow">
          {infinitySagaMovies.map((movie, index) => {
            const isRightSide = index % 2 !== 0; // Even index = left card, Odd index = right card
            const isActive = activeMovieId === movie.id;
            const showPhaseTwoDivider = movie.id === 7;
            const showPhaseThreeDivider = movie.id === 13;

            return (
              <div key={movie.id} className="timeline-item-block">
                {showPhaseTwoDivider && <PhaseDivider phaseKey={2} info={phaseInfo[2]} />}
                {showPhaseThreeDivider && <PhaseDivider phaseKey={3} info={phaseInfo[3]} />}

                <div
                  id={`movie-${movie.id}`}
                  ref={(el) => (movieRefs.current[movie.id] = el)}
                  className={`timeline-row ${isRightSide ? 'layout-right' : 'layout-left'} ${
                    isActive ? 'row-active' : ''
                  }`}
                >
                  {/* Left Column */}
                  <div className="timeline-col col-left">
                    {!isRightSide ? (
                      <MovieCard movie={movie} onSelect={openModal} isRightSide={false} />
                    ) : (
                      <AboutMovieBlock movie={movie} isRightSide={false} />
                    )}
                  </div>

                  {/* Center Node Column */}
                  <div className="timeline-col col-center">
                    <TimelineNode
                      number={movie.number}
                      isActive={isActive}
                      onClick={() => openModal(movie)}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="timeline-col col-right">
                    {isRightSide ? (
                      <MovieCard movie={movie} onSelect={openModal} isRightSide={true} />
                    ) : (
                      <AboutMovieBlock movie={movie} isRightSide={true} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={closeModal}
        onNavigate={navigateModal}
        totalMovies={infinitySagaMovies.length}
      />
    </section>
  );
}

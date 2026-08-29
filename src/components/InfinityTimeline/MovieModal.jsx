import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MovieModal({ movie, isOpen, onClose, onNavigate, totalMovies }) {
  const [imgSrc, setImgSrc] = useState(movie?.poster);

  useEffect(() => {
    if (movie) setImgSrc(movie.poster);
  }, [movie]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && movie && movie.id > 1) onNavigate(movie.id - 1);
      if (e.key === 'ArrowRight' && movie && movie.id < totalMovies) onNavigate(movie.id + 1);
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, movie, onClose, onNavigate, totalMovies]);

  if (!isOpen || !movie) return null;

  const hasPrev = movie.id > 1;
  const hasNext = movie.id < totalMovies;

  const fallbackPoster = `https://placehold.co/500x750/10141e/ffffff?text=${encodeURIComponent(movie.title)}`;

  return (
    <AnimatePresence>
      <div className="movie-modal-backdrop" onClick={onClose}>
        <motion.div
          className="movie-modal-container glass-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          <div className="modal-body-scroll">
            {/* Header Hero Banner */}
            <div className="modal-hero-banner">
              <div className="modal-poster-wrap">
                <img
                  src={imgSrc}
                  alt={movie.title}
                  className="modal-poster-img"
                  onError={() => setImgSrc(fallbackPoster)}
                />
              </div>

              <div className="modal-hero-info">
                <div className="modal-meta-row">
                  <span className="modal-phase-pill">{movie.phase.toUpperCase()}</span>
                  <span className="modal-num-pill">#{movie.number}</span>
                  <span className="modal-year-pill">{movie.releaseYear}</span>
                  <span className="modal-runtime-pill">{movie.runtime}</span>
                  {movie.boxOffice && <span className="modal-boxoffice-pill">{movie.boxOffice}</span>}
                </div>

                <h2 className="modal-movie-title">{movie.title}</h2>
                
                {movie.tagline && (
                  <p className="modal-tagline-text">"{movie.tagline}"</p>
                )}

                <p className="modal-release-date">Theatrical Release: {movie.releaseDate}</p>

                <div className="modal-tags">
                  {movie.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Layout Grid */}
            <div className="modal-content-grid">
              <div className="modal-main-col">
                <section className="modal-section">
                  <h4 className="modal-section-title">FULL SYNOPSIS</h4>
                  <p className="modal-text">{movie.synopsis}</p>
                </section>

                <section className="modal-section">
                  <h4 className="modal-section-title">INFINITY SAGA LORE CONNECTION</h4>
                  <p className="modal-text highlight-box">{movie.infinityConnection}</p>
                </section>

                {movie.quote && (
                  <section className="modal-section">
                    <h4 className="modal-section-title">MEMORABLE QUOTE</h4>
                    <blockquote className="modal-quote-box">
                      "{movie.quote}"
                    </blockquote>
                  </section>
                )}

                {movie.postCredits && (
                  <section className="modal-section">
                    <h4 className="modal-section-title">POST-CREDITS SCENE</h4>
                    <p className="modal-text postcredits-box">{movie.postCredits}</p>
                  </section>
                )}

                <section className="modal-section">
                  <h4 className="modal-section-title">MCU SIGNIFICANCE</h4>
                  <p className="modal-text">{movie.significance}</p>
                </section>
              </div>

              <div className="modal-side-col">
                {movie.stone && (
                  <div className="modal-info-card stone-card">
                    <span className="info-label">INFINITY STONE / ARTIFACT</span>
                    <span className="info-value stone-value">{movie.stone}</span>
                  </div>
                )}

                <div className="modal-info-card">
                  <span className="info-label">DIRECTED BY</span>
                  <span className="info-value">{movie.director}</span>
                </div>

                <div className="modal-info-card">
                  <span className="info-label">STARRING CAST</span>
                  <ul className="cast-list">
                    {movie.cast.map((actor) => (
                      <li key={actor}>{actor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Controls Bar */}
            <div className="modal-navigation-bar">
              <button
                className={`modal-nav-btn prev ${!hasPrev ? 'disabled' : ''}`}
                onClick={() => hasPrev && onNavigate(movie.id - 1)}
                disabled={!hasPrev}
              >
                ← PREVIOUS FILM
              </button>

              <span className="modal-nav-counter">
                {movie.number} / {totalMovies < 10 ? `0${totalMovies}` : totalMovies}
              </span>

              <button
                className={`modal-nav-btn next ${!hasNext ? 'disabled' : ''}`}
                onClick={() => hasNext && onNavigate(movie.id + 1)}
                disabled={!hasNext}
              >
                NEXT FILM →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


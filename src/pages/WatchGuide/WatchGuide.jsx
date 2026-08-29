import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { infinitySagaMovies } from '../../data/infinitySaga';
import { getMinimumWatchPath } from '../../utils/watchGuide';
import MovieModal from '../../components/InfinityTimeline/MovieModal';

export default function WatchGuide({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(22); // Default to Avengers: Endgame
  const [activeModalMovie, setActiveModalMovie] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Suggestions for autocomplete search dropdown
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return infinitySagaMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.shortTitle.toLowerCase().includes(q) ||
        m.number.includes(q)
    );
  }, [searchTerm]);

  const watchData = useMemo(() => {
    return getMinimumWatchPath(selectedMovieId);
  }, [selectedMovieId]);

  const handleSelectMovie = (movie) => {
    setSelectedMovieId(movie.id);
    setSearchTerm('');
    setNotFound(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (suggestions.length > 0) {
      handleSelectMovie(suggestions[0]);
    } else {
      setNotFound(true);
    }
  };

  const handleStartWatching = () => {
    if (watchData && watchData.prerequisites.length > 0) {
      setActiveModalMovie(watchData.prerequisites[0].movie);
    } else if (watchData) {
      setActiveModalMovie(watchData.targetMovie);
    }
  };

  return (
    <div className="watch-guide-page fade-in-up">
      {/* Hero Header */}
      <section className="watch-hero-section">
        <div className="watch-hero-content">
          <span className="watch-eyebrow">[SHORTCUT_THROUGH_MCU]</span>
          <h1 className="watch-title">MCU WATCH GUIDE</h1>
          <h2 className="watch-subhead-headline">WHAT DO I ACTUALLY NEED TO WATCH?</h2>
          <p className="watch-subtitle">
            Enter a movie. We'll give you the absolute minimum story path.
          </p>

          {/* Minimal Search Input */}
          <form className="watch-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper glass-card">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search an Infinity Saga movie..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setNotFound(false);
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
              <button type="submit" className="search-submit-btn">
                FIND MY WATCH PATH →
              </button>
            </div>

            {/* Suggestions List */}
            {suggestions.length > 0 && (
              <ul className="search-suggestions-dropdown glass-card">
                {suggestions.map((movie) => (
                  <li
                    key={movie.id}
                    className="suggestion-item"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <span className="suggestion-num">#{movie.number}</span>
                    <span className="suggestion-title">{movie.title}</span>
                    <span className="suggestion-year">({movie.releaseYear})</span>
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Clean Error Message */}
          {notFound && (
            <motion.div
              className="movie-not-found-alert glass-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>MOVIE NOT FOUND</strong>
              <p>Choose one of the 23 Infinity Saga films.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Result Experience Section */}
      {watchData && (
        <section className="watch-result-section">
          <div className="watch-result-inner">
            {/* Result Header */}
            <div className="result-header">
              <span className="result-tag">[BEFORE_YOU_WATCH]</span>
              <h2 className="target-movie-title">{watchData.targetMovie.title}</h2>
              <div className="required-badge-container">
                <span className="required-count-badge">
                  {watchData.count === 0
                    ? 'NO PREVIOUS MOVIES REQUIRED'
                    : watchData.count === 1
                    ? '1 MOVIE REQUIRED'
                    : `${watchData.count} MOVIES REQUIRED`}
                </span>
              </div>
            </div>

            {/* Visual Watch Path Centerpiece */}
            <div className="watch-path-container glass-card">
              <h3 className="watch-path-title">MINIMUM STORY PATH</h3>
              <div className="watch-path-flow">
                {watchData.watchPath.map((item, index) => {
                  const isTarget = item.id === watchData.targetMovie.id;
                  return (
                    <div key={item.id} className="watch-path-step-wrap">
                      <div
                        className={`watch-path-step ${isTarget ? 'target-step' : ''}`}
                        onClick={() => setActiveModalMovie(item)}
                      >
                        <span className="node-icon">{isTarget ? '◉' : '●'}</span>
                        <span className="step-name">{item.title}</span>
                      </div>
                      {index < watchData.watchPath.length - 1 && (
                        <span className="path-arrow">↓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Essential Prerequisite Cards */}
            {watchData.prerequisites.length > 0 ? (
              <div className="watch-prereq-block">
                <h3 className="prereq-section-title">ESSENTIAL PREREQUISITES</h3>
                <div className="prereq-card-grid">
                  {watchData.prerequisites.map(({ movie, why }) => (
                    <div
                      key={movie.id}
                      className="prereq-card glass-card"
                      onClick={() => setActiveModalMovie(movie)}
                    >
                      <div className="prereq-poster-wrap">
                        <img src={movie.poster} alt={movie.title} className="prereq-poster-img" />
                        <span className="prereq-num-badge">#{movie.number}</span>
                      </div>
                      <div className="prereq-card-body">
                        <h4 className="prereq-movie-title">{movie.title}</h4>
                        <span className="prereq-meta">{movie.releaseYear} · {movie.phase}</span>
                        <div className="prereq-why-box">
                          <span className="why-label">WHY?</span>
                          <p className="why-text">{why}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-prereq-box glass-card">
                <p>You can watch <strong>{watchData.targetMovie.title}</strong> directly without watching any previous films.</p>
              </div>
            )}

            {/* Simple Ready CTA */}
            <div className="ready-cta-container">
              <span className="ready-tag">YOU'RE READY FOR</span>
              <h3 className="ready-target-title">{watchData.targetMovie.title}</h3>
              <button className="start-watching-btn glass-card" onClick={handleStartWatching}>
                START WATCHING →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Reusable Movie Modal */}
      <MovieModal
        movie={activeModalMovie}
        isOpen={!!activeModalMovie}
        onClose={() => setActiveModalMovie(null)}
        onNavigate={(newId) => {
          const target = infinitySagaMovies.find((m) => m.id === newId);
          if (target) setActiveModalMovie(target);
        }}
        totalMovies={infinitySagaMovies.length}
      />
    </div>
  );
}

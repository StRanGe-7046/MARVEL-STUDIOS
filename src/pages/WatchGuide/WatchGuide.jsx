import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { infinitySagaMovies } from '../../data/infinitySaga';
import { getWatchGuide } from '../../utils/watchGuide';
import MovieModal from '../../components/InfinityTimeline/MovieModal';

export default function WatchGuide({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(22); // Default to Avengers: Endgame (22)
  const [activeModalMovie, setActiveModalMovie] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Filter movies for search dropdown
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
    return getWatchGuide(selectedMovieId);
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

  const startJourney = () => {
    if (watchData && watchData.mustWatchMovies.length > 0) {
      setActiveModalMovie(watchData.mustWatchMovies[0]);
    } else if (watchData) {
      setActiveModalMovie(watchData.targetMovie);
    }
  };

  return (
    <div className="watch-guide-page fade-in-up">
      {/* Search Header Hero */}
      <section className="watch-hero-section">
        <div className="watch-hero-content">
          <span className="watch-eyebrow">[MCU_PREREQUISITE_LOG]</span>
          <h1 className="watch-title">MCU WATCH GUIDE</h1>
          <p className="watch-subtitle">
            Which movies do you actually need to watch before this one?
          </p>

          {/* Search Input Box */}
          <form className="watch-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper glass-card">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search an Infinity Saga movie (e.g. Avengers, Endgame)..."
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
                FIND WATCH PATH →
              </button>
            </div>

            {/* Suggestions Dropdown */}
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

          {/* Not Found Alert */}
          {notFound && (
            <motion.div
              className="movie-not-found-alert glass-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>MOVIE NOT FOUND</strong>
              <p>Choose one of the 23 Infinity Saga films from Phase One through Phase Three.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Watch Guide Result Section */}
      {watchData && (
        <section className="watch-result-section">
          <div className="watch-result-inner">
            {/* Header Title */}
            <div className="result-header">
              <span className="result-tag">[BEFORE_YOU_WATCH]</span>
              <h2 className="target-movie-title">{watchData.targetMovie.title}</h2>
              <p className="result-tagline">
                To fully understand this movie, these are the essential films you should watch first.
              </p>
              <div className="result-badge-row">
                <span className="required-count-badge">
                  {watchData.totalMustWatch} FILMS REQUIRED
                </span>
                <span className="runtime-badge">
                  Estimated Journey: ~{watchData.mustWatchHours} HOURS
                </span>
              </div>
            </div>

            {/* Sequential Watch Path */}
            <div className="watch-path-container glass-card">
              <h3 className="watch-path-title">SEQUENTIAL STORY PATH</h3>
              <div className="watch-path-flow">
                {watchData.watchPath.map((item, index) => {
                  const isTarget = item.id === watchData.targetMovie.id;
                  return (
                    <div key={item.id} className="watch-path-step-wrap">
                      <div
                        className={`watch-path-step ${isTarget ? 'target-step' : ''}`}
                        onClick={() => setActiveModalMovie(item)}
                      >
                        <span className="step-num">#{item.number}</span>
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

            {/* Must Watch Movies Grid */}
            <div className="watch-category-block">
              <div className="category-header">
                <h3 className="category-title">MUST WATCH</h3>
                <span className="category-subtitle">Essential for understanding plot, characters, and stones</span>
              </div>

              {watchData.mustWatchMovies.length > 0 ? (
                <div className="compact-movie-grid">
                  {watchData.mustWatchMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="compact-movie-card glass-card"
                      onClick={() => setActiveModalMovie(movie)}
                    >
                      <div className="compact-poster-wrap">
                        <img src={movie.poster} alt={movie.title} className="compact-poster-img" />
                        <span className="compact-tag must-tag">Essential</span>
                      </div>
                      <div className="compact-card-body">
                        <span className="compact-num">#{movie.number}</span>
                        <h4 className="compact-title">{movie.title}</h4>
                        <span className="compact-meta">{movie.phase} · {movie.releaseYear}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-prereq-box glass-card">
                  <p>✨ This is the first movie in the saga! No prior watching required.</p>
                </div>
              )}
            </div>

            {/* Optional Movies Grid */}
            {watchData.optionalMovies.length > 0 && (
              <div className="watch-category-block">
                <div className="category-header">
                  <h3 className="category-title optional-title">OPTIONAL</h3>
                  <span className="category-subtitle">Useful additional context and backstory</span>
                </div>

                <div className="compact-movie-grid">
                  {watchData.optionalMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="compact-movie-card glass-card"
                      onClick={() => setActiveModalMovie(movie)}
                    >
                      <div className="compact-poster-wrap">
                        <img src={movie.poster} alt={movie.title} className="compact-poster-img" />
                        <span className="compact-tag optional-tag">Optional</span>
                      </div>
                      <div className="compact-card-body">
                        <span className="compact-num">#{movie.number}</span>
                        <h4 className="compact-title">{movie.title}</h4>
                        <span className="compact-meta">{movie.phase} · {movie.releaseYear}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar at Bottom */}
            <div className="start-journey-row">
              <button className="start-journey-btn glass-card" onClick={startJourney}>
                START WATCH JOURNEY →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Reuse Movie Modal */}
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

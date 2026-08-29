import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MovieCard({ movie, onSelect, isRightSide }) {
  const [imgSrc, setImgSrc] = useState(movie.poster);

  const fallbackPoster = `https://placehold.co/500x750/10141e/ffffff?text=${encodeURIComponent(movie.title)}`;

  return (
    <motion.div
      className={`movie-card-wrapper ${isRightSide ? 'side-right' : 'side-left'}`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="movie-card glass-card" onClick={() => onSelect(movie)}>
        <div className="movie-card-poster-container">
          <img
            src={imgSrc}
            alt={`${movie.title} Poster`}
            className="movie-card-poster"
            onError={() => setImgSrc(fallbackPoster)}
            loading="lazy"
          />
          <div className="movie-card-badge">
            <span className="badge-phase">{movie.phase.toUpperCase()}</span>
            <span className="badge-number">#{movie.number}</span>
          </div>
          <div className="poster-overlay-gradient" />
        </div>

        <div className="movie-card-content">
          <div className="movie-card-header">
            <span className="movie-year">{movie.releaseYear}</span>
            <span className="movie-runtime">{movie.runtime}</span>
          </div>

          <h3 className="movie-title">{movie.title}</h3>

          <p className="movie-short-desc">{movie.synopsis}</p>

          <div className="movie-card-footer">
            <span className="view-details-btn">
              VIEW DETAILS
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

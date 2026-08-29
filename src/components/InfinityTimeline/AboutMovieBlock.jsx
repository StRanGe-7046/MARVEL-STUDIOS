import { motion } from 'framer-motion';

export default function AboutMovieBlock({ movie, isRightSide }) {
  return (
    <motion.div
      className={`about-movie-block ${isRightSide ? 'side-right' : 'side-left'}`}
      initial={{ opacity: 0, x: isRightSide ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="about-block-inner glass-card">
        <span className="about-tag">[ABOUT_FILM]</span>
        <div className="about-title-row">
          <h4 className="about-movie-title">{movie.title}</h4>
          <span className="about-year">{movie.releaseYear}</span>
        </div>

        <div className="about-divider" />

        <div className="about-section">
          <span className="about-label">DIRECTED BY</span>
          <p className="about-val">{movie.director}</p>
        </div>

        <div className="about-section">
          <span className="about-label">INFINITY CONNECTION</span>
          <p className="about-val highlight">{movie.infinityConnection}</p>
        </div>

        {movie.cast && movie.cast.length > 0 && (
          <div className="about-section">
            <span className="about-label">KEY CAST</span>
            <p className="about-val">{movie.cast.slice(0, 3).join(', ')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

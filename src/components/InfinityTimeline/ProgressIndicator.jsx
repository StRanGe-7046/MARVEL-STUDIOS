import { motion } from 'framer-motion';

export default function ProgressIndicator({ activeMovieNumber, totalMovies = 23 }) {
  const formattedActive = activeMovieNumber < 10 ? `0${activeMovieNumber}` : activeMovieNumber;
  const formattedTotal = totalMovies < 10 ? `0${totalMovies}` : totalMovies;

  return (
    <motion.div
      className="progress-indicator-pill glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <span className="pill-brand">INFINITY SAGA</span>
      <span className="pill-divider">|</span>
      <span className="pill-count">
        <strong className="active-num">{formattedActive}</strong> / {formattedTotal}
      </span>
    </motion.div>
  );
}

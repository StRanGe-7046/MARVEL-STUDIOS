import { motion } from 'framer-motion';

export default function InfinityFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="infinity-footer-section">
      <div className="infinity-footer-glow" />

      <motion.div
        className="infinity-footer-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="footer-tag">[CHAPTER_COMPLETE]</span>

        <h2 className="footer-title">
          THE END OF <br />
          <span className="gradient-text">THE INFINITY SAGA</span>
        </h2>

        <p className="footer-subtitle">
          23 FILMS. ONE UNIVERSE. ONE LEGACY.
        </p>

        <button className="restart-btn glass-card" onClick={scrollToTop}>
          RESTART JOURNEY ↑
        </button>

        <div className="footer-copyright">
          <p>AVENGERS: DOOMSDAY ARCHIVE — MARVEL CINEMATIC UNIVERSE</p>
        </div>
      </motion.div>
    </footer>
  );
}

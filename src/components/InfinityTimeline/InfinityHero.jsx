import { motion } from 'framer-motion';
import InfinityThreeScene from './InfinityThreeScene';

export default function InfinityHero() {
  const scrollToTimeline = () => {
    document.getElementById('infinity-saga')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="infinity-hero-section">
      {/* 3D Three.js Cosmic Background */}
      <InfinityThreeScene />

      <div className="hero-bg-overlay" />
      <div className="hero-grid-pattern" />

      <motion.div
        className="hero-content-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hero-eyebrow">[THE_INFINITY_SAGA_ARCHIVE]</span>

        <h1 className="hero-title">
          DOOMSDAY
          <span className="hero-subhead">THE INFINITY SAGA</span>
        </h1>

        <p className="hero-tagline">
          23 films. One universe. One inevitable end.
        </p>

        <div className="hero-scroll-prompt" onClick={scrollToTimeline}>
          <span className="scroll-text">SCROLL TO BEGIN</span>
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


import { motion } from 'framer-motion';

export default function PhaseDivider({ phaseKey, info }) {
  return (
    <motion.div
      id={`phase-${phaseKey}`}
      className="phase-divider-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="phase-divider-line" />
      <div className="phase-divider-content">
        <span className="phase-watermark">0{phaseKey}</span>
        <div className="phase-tag">[CHAPTER_0{phaseKey}]</div>
        <h2 className="phase-title">{info.title}</h2>
        <h3 className="phase-subtitle">{info.subtitle}</h3>
        <p className="phase-desc">{info.desc}</p>
      </div>
      <div className="phase-divider-line" />
    </motion.div>
  );
}

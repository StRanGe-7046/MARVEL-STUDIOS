import { motion } from 'framer-motion';

export default function TimelineNode({ number, isActive, onClick }) {
  return (
    <div className="timeline-node-container" onClick={onClick} role="button" tabIndex={0}>
      <motion.div
        className={`timeline-node-circle ${isActive ? 'active' : ''}`}
        animate={{
          scale: isActive ? 1.15 : 1,
          borderColor: isActive ? '#7df4ff' : 'rgba(255, 255, 255, 0.25)',
          boxShadow: isActive
            ? '0 0 25px rgba(125, 244, 255, 0.8), 0 0 10px rgba(229, 9, 20, 0.5)'
            : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="node-number">{number}</span>
        {isActive && (
          <motion.div
            className="node-pulse-ring"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
          />
        )}
      </motion.div>
    </div>
  );
}

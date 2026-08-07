import { useState, useEffect, useRef } from 'react';

// Target: August 1, 2026 (Avengers Doomsday Re-release / Event)
const TARGET_DATE = new Date('2026-12-18T00:00:00+05:30');

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownCard({ value, label }) {
  const displayValue = String(value).padStart(label === 'DAYS' ? 3 : 2, '0');
  return (
    <div className="countdown-card glass-card">
      <div className="countdown-unit">[{label}]</div>
      <span className="countdown-number">{displayValue}</span>
      <div className="countdown-divider" />
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="countdown-section" id="countdown" ref={sectionRef}>
      <div className="countdown-inner">
        <div className={`countdown-header reveal${visible ? ' visible' : ''}`}>
          <div>
            <h2 className="countdown-title">The Countdown</h2>
            <p className="countdown-description">
              The collision of universes is inevitable. Prepare for the final convergence of the Multiverse Saga.
            </p>
          </div>
          <div className="extinction-badge">
            <span
              className="pulse-dot"
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--secondary)',
              }}
            />
            EXTINCTION EVENT IMMINENT
          </div>
        </div>
        <div className={`countdown-grid reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <CountdownCard value={time.days} label="DAYS" />
          <CountdownCard value={time.hours} label="HOURS" />
          <CountdownCard value={time.minutes} label="MINUTES" />
          <CountdownCard value={time.seconds} label="SECONDS" />
        </div>
      </div>
    </section>
  );
}

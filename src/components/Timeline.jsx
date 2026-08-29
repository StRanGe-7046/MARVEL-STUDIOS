import { useEffect, useRef, useState } from 'react';

const TIMELINE = [
  {
    id: 'infinity',
    date: '2008 - 2019',
    title: 'THE INFINITY SAGA',
    desc: 'The era of the stones. The emergence of heroes and the first universal threat.',
    dateColor: 'var(--primary-fixed)',
    dotColor: 'var(--primary-fixed)',
    dotShadow: '0 0 15px rgba(125, 244, 255, 0.6)',
    pulse: false,
    interactive: true,
  },
  {
    id: 'multiverse',
    date: '2021 - 2026',
    title: 'THE MULTIVERSE SAGA',
    desc: 'Reality fracturing. Variants and incursions threaten the very fabric of existence.',
    dateColor: 'var(--outline)',
    dotColor: 'var(--outline-variant)',
    dotShadow: 'none',
    pulse: false,
    interactive: false,
  },
  {
    id: 'doomsday',
    date: 'MAY 2026',
    title: 'DOOMSDAY',
    desc: 'The final convergence. All paths lead to Doom. The end of everything as we know it.',
    dateColor: 'var(--secondary)',
    dotColor: 'var(--secondary)',
    dotShadow: 'none',
    pulse: true,
    interactive: false,
  },
];

export default function Timeline({ onNavigateSaga }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id) => {
    if (id === 'infinity') {
      if (onNavigateSaga) {
        onNavigateSaga('infinity-saga');
      } else {
        const el = document.getElementById('infinity-saga');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="timeline-section" ref={sectionRef}>
      <div className="timeline-inner">
        <div className={`timeline-header reveal${visible ? ' visible' : ''}`}>
          <span className="timeline-tag">[THE_CONVERGENCE_LOG]</span>
          <h2 className="timeline-title">REALITY TIMELINE</h2>
        </div>
        <div className="timeline-track">
          <div className="timeline-line" />
          <div className={`timeline-grid reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            {TIMELINE.map(item => (
              <div key={item.id} className="timeline-card-wrapper">
                <div
                  className={`timeline-card glass-card${item.pulse ? ' threat-pulse' : ''}${item.interactive ? ' saga-card-interactive' : ''}`}
                  onClick={() => handleCardClick(item.id)}
                  style={{ cursor: item.interactive ? 'pointer' : 'default' }}
                >
                  <span
                    className="timeline-date"
                    style={{ color: item.dateColor }}
                  >
                    {item.date}
                  </span>
                  <h3 className="timeline-card-title">{item.title}</h3>
                  <p className="timeline-card-desc">{item.desc}</p>
                  {item.interactive && (
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--primary-fixed)' }}>
                        OPEN SEPARATE PAGE →
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="timeline-dot"
                  style={{ background: item.dotColor, boxShadow: item.dotShadow }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



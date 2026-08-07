import { useEffect, useRef, useState } from 'react';

export default function DoctorSection() {
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

  return (
    <section className="doctor-section" id="intel" ref={sectionRef}>
      <div className="doctor-bg" />
      <div className="doctor-inner">
        <div className="doctor-grid">
          {/* Image Column */}
          <div className={`doctor-image-col reveal${visible ? ' visible' : ''}`}>
            <div className="doctor-frame" />
            <div className="doctor-img-card glass-card threat-pulse">
              <img
                className="doctor-img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXk0RWKi_8EIKqtWnvZoqUZ0kyKkB4d6PwbqSU6IvVmHIisjDgs4OsMUi5nmDImRHldzR37vtr1mP07AoHglLNcTXUBeCF6V18MjXk52K66zKgb892qR7_LkzfzoXd-QG-CiB3v8j97PJb9VqtBgF_KuMRme0D6RU1ZzeNkTD_K3vT2acCO6rmruBLfJQv84BKJ-_7i9dH31rW7PPts02dGGuElgJlObIPOjXfl-Olya2FFc6fVGVA"
                alt="Doctor Doom - Victor von Doom"
              />
            </div>
            <div className="doctor-badge glass-card">
              <span className="doctor-badge-label">Designation</span>
              <h3 className="doctor-badge-title">DOOM</h3>
            </div>
          </div>

          {/* Text Column */}
          <div className={`doctor-text-col reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <span className="doctor-tag">[PRIMARY_ANTAGONIST]</span>
            <h2 className="doctor-heading">THE<br />DOCTOR</h2>
            <p className="doctor-desc">
              A monarch. A sorcerer. A god. Victor von Doom emerges from the wreckage of the Multiverse
              to impose his singular will upon reality itself. The lines between hero and villain have
              never been more blurred.
            </p>
            <ul className="doctor-list">
              {[
                { num: '01.', text: 'LATVERIAN DOMINANCE' },
                { num: '02.', text: 'ARCANE INTELLECT' },
                { num: '03.', text: 'MULTIVERSAL SOVEREIGN' },
              ].map(item => (
                <li key={item.num}>
                  <span className="doctor-list-num">{item.num}</span>
                  <span className="doctor-list-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

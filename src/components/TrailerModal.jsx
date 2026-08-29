import { useState } from 'react';

export default function TrailerModal({ isOpen, onClose }) {
  const [videoError, setVideoError] = useState(false);

  if (!isOpen) return null;

  const trailerVideoPath = `${import.meta.env.BASE_URL}avengers-doomsday-trailer.mp4`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕ CLOSE
        </button>

        {!videoError ? (
          <video
            className="modal-video glass-card"
            controls
            autoPlay
            playsInline
            onError={() => setVideoError(true)}
          >
            <source src={trailerVideoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#ffffff' }}>
            <h3 style={{ color: '#e50914', marginBottom: '1rem' }}>OFFICIAL TRAILER</h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Avengers Doomsday Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
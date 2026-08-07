export default function TrailerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕ CLOSE
        </button>

        <video
          className="modal-video glass-card"
          controls
          autoPlay
          playsInline
        >
          <source src={encodeURI('/Avengers Doomsday  Official Trailer.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
    </div>
  );
}
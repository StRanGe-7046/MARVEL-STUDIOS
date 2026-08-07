import { useEffect, useRef, useState } from 'react';
import './MarvelIntro.css';

const FADE_DURATION = 700;
// Vite serves files in /public unchanged. This avoids a build-time error before
// the user adds the optional intro video.
const marvelIntroVideo = `${import.meta.env.BASE_URL}public/Marvel Studios intro.mp4`;

function MarvelIntro({ onDismiss }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const closeIntro = () => {
    if (isLeaving) return;

    setIsLeaving(true);
    window.setTimeout(onDismiss, FADE_DURATION);
  };

  const startIntro = async () => {
    const video = videoRef.current;
    if (!video) return;

    setHasStarted(true);
    video.muted = false;

    try {
      await video.play();
    } catch {
      // Keep the button available if the browser unexpectedly rejects playback.
      setHasStarted(false);
    }
  };

  const skipIntro = () => {
    videoRef.current?.pause();
    closeIntro();
  };

  return (
    <section
      className={`marvel-intro${isLeaving ? ' marvel-intro--leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Avengers Doomsday introduction"
    >
      <video
        ref={videoRef}
        className="marvel-intro__video"
        playsInline
        preload="auto"
        onEnded={closeIntro}
      >
        <source src={marvelIntroVideo} type="video/mp4" />
      </video>

      <div className="marvel-intro__vignette" aria-hidden="true" />

      {!hasStarted && (
        <div className="marvel-intro__prompt">
          <p>MARVEL STUDIOS</p>
          <button className="marvel-intro__play" type="button" onClick={startIntro}>
            <span aria-hidden="true">▶</span>
            PLAY INTRO
          </button>
        </div>
      )}

      <button className="marvel-intro__skip" type="button" onClick={skipIntro}>
        SKIP INTRO
      </button>
    </section>
  );
}

export default MarvelIntro;

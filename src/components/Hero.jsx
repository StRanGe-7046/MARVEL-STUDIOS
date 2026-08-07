import ShaderBackground from './ShaderBackground';
import ThreeJSScene from './ThreeJSScene';

export default function Hero({ onWatchTrailer, onExploreCast }) {
  return (
    <header className="hero" id="synopsis">
      {/* WebGL Shader Background */}
      <ShaderBackground />

      {/* Three.js 3D Scene */}
      <ThreeJSScene />

      {/* Content Overlay */}
      <div className="hero-content fade-in-up">
        <span className="hero-tag">[MULTIVERSAL_THREAT_DETECTED]</span>
        <h1 className="hero-title">
          AVENGERS<br />DOOMSDAY
        </h1>
        <p className="hero-subtitle">The End Begins</p>
        <div className="hero-buttons">
          <button className="btn-primary" id="hero-watch-trailer" onClick={onWatchTrailer}>
            Watch Trailer
          </button>
          <button className="btn-secondary" id="hero-explore-cast" onClick={onExploreCast}>
            Explore Cast
          </button>
        </div>
      </div>

      {/* HUD Elements */}
      <div className="hud-left">
        <span className="hud-label">[SYSTEM_STATUS]</span>
        <div className="hud-line" />
        <span className="hud-value">CORE_TEMP: 4500K</span>
      </div>
      <div className="hud-right">
        <span className="hud-label">[TIMELINE_ANCHOR]</span>
        <div className="hud-line" />
        <span className="hud-value-red">REALITY_STABILITY: 14.2%</span>
      </div>
    </header>
  );
}

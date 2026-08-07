export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">AVENGERS: DOOMSDAY</div>
        <nav className="footer-links">
          {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Press Kit'].map(link => (
            <a key={link} href="#" onClick={e => e.preventDefault()}>{link}</a>
          ))}
        </nav>
        <p className="footer-copy">
          © 2024 MARVEL. ALL RIGHTS RESERVED. [MULTIVERSAL_ENCRYPTION_ACTIVE]
        </p>
        <div className="footer-icons">
          <span className="material-symbols-outlined footer-icon" title="Share">share</span>
          <span className="material-symbols-outlined footer-icon" title="Website">public</span>
          <span className="material-symbols-outlined footer-icon" title="Shield">shield</span>
        </div>
      </div>
    </footer>
  );
}

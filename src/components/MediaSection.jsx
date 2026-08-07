import { useEffect, useRef, useState } from 'react';

const POSTERS = [
  {
    id: 'poster1',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzcMxvRwvrA7PzEpGp_cgSrGLDEa_upX6m84sXkopM-MlYMVxOVbjehnNQPB9dIGuX1_aQafIHe9-0i9AEuCAeXK4yxlIzanY22etoqT_0ePS_9slXm0gVSoJtyC35fpIdZ0m30Kj8F5lDFvIVKQiFhKIJ1Yc8WLAiPSTKxdy0KY110XohO9waaLBKjWUoxjHtvXJBh5pGjT2U5z5S8dDh0eMvV0Zkc1kPREoeSw2yJRnnPXGIKXMP',
    alt: 'Doomsday Minimalist Poster',
  },
  {
    id: 'poster2',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUjiSIw7BfqjDXdzsUO_8LdVVkGR5gToGMZrI1IrlQwQpeAj8xTb7ug-tqYStoBoUfv93apnDXXpFRoW8ln0JipxJnK3DOMSX2y23HAHkDhnH50CK5TUcF9jywGDIzlnb1hHmenJaJwcdY9aBsGq_vL5WZFVsphQK4EKIMODc7oJIO6d917o7IiS9ngvH010SsEax5UM4ys9gHhmjkbnGxk163pdM_EJ_-lv7ayB9Ko1N0-Ss2r6zq',
    alt: 'Avengers in Space Poster',
  },
  {
    id: 'poster3',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qouqjoe4B3k-wgvE4O-6fXNCnvFQuruhE5dZ6rxzmdTlEXRjb5LvxtJtxok4ACZHu5zxzXDJeVlKfGK49ZmKnf5ZDlkpzrkGHyS5K96Sg_Itu3MGVV9hzTc1mJjT4tCMsXljf6EZe7QpKvip00cyWmwX6c_dFUIYtOB0uf2Auhgw6lJimsEUDYz747N-jC19dMBmAZeLAHOw12lgX7gaSkJgkf7gcyDGuSMYkNaFbXlKk1k-NP1i',
    alt: 'Shattered Avengers Emblem',
  },
];

export default function MediaSection({ onWatchTrailer }) {
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
    <section className="media-section" ref={sectionRef}>
      <div className="media-inner">
        <div className={`media-grid reveal${visible ? ' visible' : ''}`}>
          {/* Main Video */}
          <div className="video-card glass-card">
            <div className="video-wrapper" onClick={onWatchTrailer} id="media-play-trailer">
              <img
                className="video-img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSBLwHeI6SgXScbs5ylnuLUcI_iINc8PeJaXVmRyqC-y9FReZBFGS8ZcY-hQs5wY27GqX_9wwMqmp1CO_v0sUZbWJCKIFSfYLpN395dx9fl7rgmUmQoX3vn-Mr__yJ2rWbCOdPDN00UR8GUjOjNJgGy88YyK5ML7HIBYlHSv8-Cxi_FZ14QPC2iconjDm3ssdKu5HJnu1w9l5JkfBPP3_hITBh1Do_uwZpjoKjGK6x7nXVYm3wZYN4"
                alt="Multiversal Landscape - Official Teaser"
              />
              <div className="video-overlay">
                <div className="play-btn">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
            </div>
            <div className="video-caption">
              <span className="video-label">OFFICIAL TEASER</span>
              <h3 className="video-title">FIRST LOOK: THE END BEGINS</h3>
            </div>
          </div>

          {/* Poster Grid */}
          <div className="poster-grid">
            {POSTERS.map(poster => (
              <div key={poster.id} className="poster-card glass-card" id={poster.id}>
                <img className="poster-img" src={poster.src} alt={poster.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

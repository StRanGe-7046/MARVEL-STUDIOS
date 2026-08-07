import { useEffect, useRef, useState } from 'react';

const portrait = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=900`;

const CAST = [
  ['Robert Downey Jr.', 'Doctor Doom', 'Avengers', 'Robert Downey, Jr. Comic-Con 2014.jpg'],
  ['Chris Hemsworth', 'Thor', 'Avengers', 'Chris Hemsworth by Gage Skidmore 2.jpg'],
  ['Anthony Mackie', 'Captain America', 'Avengers', 'Anthony Mackie by Gage Skidmore 2.jpg'],
  ['Sebastian Stan', 'Winter Soldier', 'Avengers', 'Sebastian Stan by Gage Skidmore 2.jpg'],
  ['Paul Rudd', 'Ant-Man', 'Avengers', 'Paul Rudd 2015.jpg'],
  ['Tom Hiddleston', 'Loki', 'Avengers', 'Tom Hiddleston by Gage Skidmore 2.jpg'],
  ['Letitia Wright', 'Black Panther', 'Avengers', 'Letitia Wright by Gage Skidmore.jpg'],
  ['Simu Liu', 'Shang-Chi', 'Avengers', 'Simu Liu by Gage Skidmore.jpg'],
  ['Florence Pugh', 'Yelena Belova', 'Thunderbolts', 'Florence Pugh 2024.jpg'],
  ['David Harbour', 'Red Guardian', 'Thunderbolts', 'David Harbour by Gage Skidmore.jpg'],
  ['Wyatt Russell', 'U.S. Agent', 'Thunderbolts', 'Wyatt Russell 2017.jpg'],
  ['Hannah John-Kamen', 'Ghost', 'Thunderbolts', 'Hannah John-Kamen by Gage Skidmore.jpg'],
  ['Lewis Pullman', 'Sentry', 'Thunderbolts', 'Lewis Pullman 2018.jpg'],
  ['Pedro Pascal', 'Reed Richards', 'Fantastic Four', 'Pedro Pascal by Gage Skidmore 2.jpg'],
  ['Vanessa Kirby', 'Sue Storm', 'Fantastic Four', 'Vanessa Kirby 2018.jpg'],
  ['Joseph Quinn', 'Human Torch', 'Fantastic Four', 'Joseph Quinn 2022.jpg'],
  ['Ebon Moss-Bachrach', 'The Thing', 'Fantastic Four', 'Ebon Moss-Bachrach 2023.jpg'],
  ['Patrick Stewart', 'Professor X', 'X-Men', 'Patrick Stewart by Gage Skidmore 2.jpg'],
  ['Ian McKellen', 'Magneto', 'X-Men', 'Ian McKellen 2016.jpg'],
  ['James Marsden', 'Cyclops', 'X-Men', 'James Marsden by Gage Skidmore.jpg'],
  ['Rebecca Romijn', 'Mystique', 'X-Men', 'Rebecca Romijn 2012.jpg'],
  ['Alan Cumming', 'Nightcrawler', 'X-Men', 'Alan Cumming 2013.jpg'],
  ['Kelsey Grammer', 'Beast', 'X-Men', 'Kelsey Grammer 2010.jpg'],
  ['Channing Tatum', 'Gambit', 'X-Men', 'Channing Tatum 2015.jpg'],
  ["Winston Duke", "M'Baku", 'Wakanda', 'Winston Duke by Gage Skidmore.jpg'],
  ['Tenoch Huerta', 'Namor', 'Wakanda', 'Tenoch Huerta 2022.jpg'],
  ['Danny Ramirez', 'Falcon', 'Next Generation', 'Danny Ramirez 2022.jpg'],
  ['Dominique Thorne', 'Ironheart', 'Next Generation', 'Dominique Thorne 2022.jpg'],
  ['Julia Louis-Dreyfus', 'Valentina Allegra de Fontaine', 'Government', 'Julia Louis-Dreyfus 2019.jpg'],
].map(([name, role, team, image]) => ({ name, role, team, image: portrait(image) }));

const TEAM_ICON = { Avengers: '🛡', Thunderbolts: '⚡', 'Fantastic Four': '🔵', 'X-Men': '❌', Wakanda: '🌊', Government: '🛡', 'Next Generation': '🚀' };

export default function CastSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState({});
  const [failed, setFailed] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cast-section" id="cast" ref={sectionRef}>
      <div className="cast-inner">
        <div className={`cast-header reveal${visible ? ' visible' : ''}`}>
          <span className="section-tag">Marvel Studios</span>
          <h2 className="section-title">Meet the Cast</h2>
        </div>
        <div className={`cast-grid cast-gallery${visible ? ' cast-gallery--visible' : ''}`} role="list" aria-label="Avengers: Doomsday cast">
          {CAST.filter((member) => !failed[member.name]).map((member, index) => (
            <article className="cast-card" role="listitem" key={member.name} tabIndex="0" style={{ '--cast-delay': `${index * 45}ms` }}>
              <div className="cast-img-wrapper">
                <img className={`cast-img${loaded[member.name] ? ' is-loaded' : ''}`} src={member.image} alt={`${member.name} as ${member.role}`} loading="lazy" decoding="async" onLoad={() => setLoaded((current) => ({ ...current, [member.name]: true }))} onError={() => setFailed((current) => ({ ...current, [member.name]: true }))} />
              </div>
              <div className="cast-overlay" />
              <div className="cast-badges"><span className={`cast-team cast-team--${member.team.toLowerCase().replaceAll(' ', '-')}`}>{TEAM_ICON[member.team]} {member.team}</span><span className="cast-status">Confirmed</span></div>
              <div className="cast-info"><h3 className="cast-name">{member.name}</h3><p className="cast-role">{member.role}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

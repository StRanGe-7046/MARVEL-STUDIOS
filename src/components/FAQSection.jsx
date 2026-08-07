import { useState, useRef, useEffect } from 'react';

const FAQS = [
  {
    question: "When does Avengers: Doomsday release?",
    answer: "Avengers: Doomsday is scheduled for a theatrical release worldwide on May 1, 2026. However, due to the impending convergence, reality as we know it may cease to exist before then."
  },
  {
    question: "How does Doctor Doom fit into the Multiverse Saga?",
    answer: "Victor von Doom has emerged as the ultimate multiversal threat. His intellect and mastery of both science and sorcery have allowed him to manipulate the incursions destroying parallel dimensions, positioning himself as the savior and ruler of what remains."
  },
  {
    question: "Will the Fantastic Four appear in this movie?",
    answer: "Yes. Reed Richards, Sue Storm, Johnny Storm, and Ben Grimm are critical to the narrative. Their deep history with Victor von Doom makes them central to Earth's resistance against his multiversal conquest."
  },
  {
    question: "What is an Incursion?",
    answer: "An incursion occurs when the boundary between two universes erodes, causing them to collide. The result is the total annihilation of one or both universes unless prevented."
  },
  {
    question: "Is this the end of the Avengers?",
    answer: "The Vanguard represents Earth's final stand. With reality fracturing and former allies turned to dust, this will be the most devastating conflict the Avengers have ever faced."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
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
    <section className="py-[160px] px-8 bg-surface-dim" id="faq" ref={sectionRef}>
      <div className="max-w-[800px] mx-auto">
        <div className={`text-center mb-16 reveal${visible ? ' visible' : ''}`}>
          <span className="font-label text-[12px] font-bold tracking-[0.4em] uppercase text-outline mb-4 block">Classified Intel</span>
          <h2 className="font-headline text-[clamp(40px,5vw,64px)] text-on-surface uppercase tracking-tight">F.A.Q.</h2>
        </div>
        
        <div className={`space-y-4 reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`glass-card overflow-hidden transition-all duration-300 border-l-4 ${openIndex === index ? 'border-primary-fixed' : 'border-transparent'}`}
            >
              <button 
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-geist text-[16px] font-bold tracking-[0.05em] uppercase text-on-surface group-hover:text-primary-fixed transition-colors">
                  {faq.question}
                </span>
                <span className={`material-symbols-outlined text-outline transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary-fixed' : ''}`}>
                  expand_more
                </span>
              </button>
              
              <div 
                className={`px-6 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[300px] pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="h-[1px] w-full bg-outline-variant/30 mb-4" />
                <p className="font-body text-[16px] leading-[1.8] text-on-surface-variant">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

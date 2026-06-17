// About.jsx
import { useEffect, useRef } from 'react';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
   'React',
  'Node.js',
  'Python',
  'postgreSQL',
  'Bootstrap',
  'Tailwind CSS',
  'Framer Motion',
  'git + GitHub',
  'Docker',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="portfolio-section transition-all duration-700 opacity-0 translate-y-12"
    >
      <div className="portfolio-inner">
        <div className="mb-14 max-w-3xl">
          <div className="section-label">
            <span className="live-dot" />
            About
          </div>
          <h2 className="section-title">
            About <span className="accent">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 section-copy">
            <p>
              Hey! I'm <span className="font-semibold text-accent">Tarko</span>,
              a full-stack developer from Ethiopia who recently completed a fullstack
              development course and has been building real-world projects ever since.
            </p>

            <p>
              I've shipped projects across the full stack — from a{' '}
              <strong>hotel guest services platform</strong> with React, PHP and MySQL,
              to a <strong>Telegram-integrated voting app</strong> with Node.js and
              React, to polished frontend clones and brand sites deployed live. I enjoy
              working across the entire product — UI, logic, and backend.
            </p>

            <p>
              I care about  good design and building things that actually
              work well. Every project I've built has pushed me to learn something new —
              JWT auth, <strong>Chapa payment integration</strong>, real-time state,
              responsive layouts — and I'm hungry to keep growing in a real team
              environment.
            </p>

  
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#f0ede6] mb-6">
                What I Work With
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="portfolio-card p-4 hover:-translate-y-1"
                  >
                    <div className="mono-text text-xs text-accent mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="font-medium text-[#f0ede6]">{skill}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a href="#contact" className="portfolio-btn">
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
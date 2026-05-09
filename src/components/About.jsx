// About.jsx
import { useEffect, useRef } from 'react';

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Framer Motion',
  'UI/UX Design',
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
              Hey there! I'm <span className="font-semibold text-accent">Tarko</span>,
              a passionate full-stack developer from Ethiopia who lives for turning ideas
              into clean, fast, and beautiful web experiences.
            </p>

            <p>
              I specialize in <strong>React</strong>, <strong>Next.js</strong>,
              <strong> TypeScript</strong>, and modern JavaScript ecosystems. Whether it's
              crafting pixel-perfect UIs, building scalable backends with Node.js/Express,
              or optimizing performance until it feels effortless, I love the whole journey.
            </p>

            <p>
              Beyond code, I'm obsessed with great design, smooth animations, developer
              experience, and creating tools that actually feel good to use. When I'm not
              coding, you'll probably find me exploring UI trends or polishing small details.
            </p>

            <p className="font-medium text-xl text-accent pt-4">
              Currently seeking exciting opportunities to build something meaningful.
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

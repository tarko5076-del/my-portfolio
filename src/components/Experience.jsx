// Experience.jsx
import { useEffect, useRef } from 'react';

const experiences = [
  {
    id: 1,
    role: 'Electrical Installation Technician',
    organization: ' Field Work',
    period: 'Summer 2024',
    type: 'Work Experience',
    highlights: [
      'Worked as part of an installation team on real electrical projects, coordinating tasks across multiple team members.',
      'Developed strong on-site communication skills and learned how to manage and prioritize tasks under deadlines.',
      'Gained hands-on experience with project execution from planning through to delivery.',
    ],
  },
  {
    id: 2,
    role: 'Secretary — Charity Club',
    organization: 'Campus Union Charity Club',
    period: '2024 — Present',
    type: 'Volunteer',
    highlights: [
      'Served as secretary for the campus charity club, organizing events and coordinating volunteer activities to support people in need.',
      'Managed club communications, documentation, and meeting records.',
      'Strengthened teamwork, leadership, and organizational skills through consistent community involvement.',
    ],
  },
];

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      className="portfolio-section transition-all duration-700 opacity-0 translate-y-12"
    >
      <div className="portfolio-inner">
        <div className="mb-14 max-w-3xl">
          <div className="section-label">
            <span className="live-dot" />
            Experience
          </div>
          <h2 className="section-title">
            My <span className="accent">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-[11px] hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex gap-8 group">

                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border border-accent bg-transparent group-hover:bg-accent transition-colors duration-300 flex items-center justify-center mt-1 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>

                {/* Card */}
                <div className="portfolio-card p-7 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="mono-text text-[0.62rem] text-accent mb-2">
                        {exp.type}
                      </div>
                      <h3 className="text-xl font-bold text-[#f0ede6]">
                        {exp.role}
                      </h3>
                      <p className="section-copy mt-1">{exp.organization}</p>
                    </div>

                    <div className="section-label !mb-0 !text-[0.62rem] shrink-0">
                      <span className="live-dot" />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="flex gap-3 section-copy">
                        <span className="text-accent mt-1 shrink-0">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
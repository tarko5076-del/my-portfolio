// Projects.jsx
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-commerce Dashboard',
    category: 'Fullstack',
    description: 'React + Node + MongoDB dashboard for managing products, orders, and store activity.',
    link: '#',
    status: 'Featured',
  },
  {
    id: 2,
    title: 'Portfolio v2',
    category: 'React',
    description: 'A modern personal portfolio with fast sections, motion, and a focused visual system.',
    link: '#',
    status: 'Live',
  },
  {
    id: 3,
    title: 'Memory Card Game',
    category: 'Front-end',
    description: 'A React-powered card game focused on interaction, state management, and quick feedback.',
    link: '#',
    status: 'Playable',
  },
  {
    id: 4,
    title: 'Telegram Award Vote',
    category: 'Fullstack',
    description: 'A MERN voting flow for community awards, nominees, and real-time participation.',
    link: '#',
    status: 'MERN',
  },
];

const categories = ['All', 'React', 'Front-end', 'Fullstack'];

const cardVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-inner">
        <div className="mb-12 max-w-3xl">
          <div className="section-label">
            <span className="live-dot" />
            Selected Work
          </div>
          <h2 className="section-title">
            Recent <span className="accent">Projects</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <Motion.button
              key={category}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(category)}
              className={`portfolio-chip ${activeFilter === category ? 'active' : ''}`}
            >
              {category === 'All' ? 'All Work' : category}
            </Motion.button>
          ))}
        </div>

        <Motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <Motion.article
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="portfolio-card group min-h-[22rem] flex flex-col"
              >
                <div className="h-44 border-b border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="mono-text text-[5rem] leading-none text-white/[0.03]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute left-5 top-5 section-label !mb-0 !text-[0.58rem]">
                    <span className="live-dot" />
                    {project.status}
                  </div>
                </div>

                <div className="p-6 flex flex-1 flex-col">
                  <div className="mono-text text-[0.62rem] text-accent mb-4">
                    {project.category}
                  </div>

                  <h3 className="text-2xl font-bold text-[#f0ede6] mb-4">
                    {project.title}
                  </h3>

                  <p className="section-copy mb-8 flex-1">
                    {project.description}
                  </p>

                  <a href={project.link} className="portfolio-btn secondary w-full">
                    View Project
                  </a>
                </div>
              </Motion.article>
            ))}
          </AnimatePresence>
        </Motion.div>

        {filteredProjects.length === 0 && (
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-copy mt-12"
          >
            No projects match this filter yet.
          </Motion.p>
        )}
      </div>
    </section>
  );
}

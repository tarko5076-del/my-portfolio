// Projects.jsx
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
  id: 1,
  title: 'Ardent Hotel — Guest Services',
  description: 'A full-stack guest services platform for Ardent Hotel. Guests can browse the menu, manage a cart, and place food orders with cash or Stripe checkout. Includes room availability search and booking management. Built with React 18 + Vite on the frontend and a PHP 8 REST API with MySQL — featuring JWT auth, role-based access, and a protected admin dashboard for managing orders, menus, and rooms.',
  repoUrl: 'https://github.com/tarko5076-del/Ardent-hotel',
  status: 'Fullstack',
},
  {
    id: 2,
    title: 'Class Award Vote',
    description: 'A peer voting app built for our class to nominate and vote on end-of-year awards. Powered by a Node.js backend with a React frontend — featuring live vote counts, nominee management, and a clean results dashboard.',
    repoUrl: 'https://github.com/tarko5076-del/telegram-award-vote-2026',
    status: 'Node + React',
  },
  {
  id: 3,
  title: 'Memory Card Game',
  description: 'A polished memory matching game built in React with glassmorphism card design, dramatic 3D flip animations, and 4 themed card sets — Animals, Space, Fruits, and Classic Faces. Features 3 difficulty levels, a live timer, move counter, high-score persistence via localStorage, and Web Audio API sound effects. Fully responsive from mobile to desktop.',
  liveUrl: 'https://memory-card-game-indol-theta.vercel.app',
  repoUrl: 'https://github.com/tarko5076-del/memory-card-game',
  status: 'Playable',
},{
  id: 4,
  title: 'Apple Home Page Clone',
  description: 'A responsive, component-based recreation of the Apple homepage built with React and Vite. Focused on replicating Apple\'s clean layout structure, precise spacing, and fully responsive design across all screen sizes.',
  liveUrl: 'https://apple-clone-rupr.vercel.app/',
  repoUrl: 'https://github.com/tarko5076-del/apple-clone',
  status: 'Frontend',
},
  {
  id: 5,
  title: 'power plus installation — Electric Brand Site',
  description: 'A brand identity website for an electric company built with React and Vite. Designed to establish a strong professional presence with a bold visual system, service sections, and a fully responsive layout.',
  liveUrl: 'https://wube-nu.vercel.app',
  repoUrl: 'https://github.com/tarko5076-del/wube',
  status: 'Live',
},
];

const cardVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function Projects() {
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

        <Motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {projects.map((project, index) => (
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
                  <h3 className="text-2xl font-bold text-[#f0ede6] mb-4">
                    {project.title}
                  </h3>

                  <p className="section-copy mb-8 flex-1">
                    {project.description}
                  </p>

                  <div className={`grid gap-3 ${project.liveUrl && project.repoUrl ? 'sm:grid-cols-2' : ''}`}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolio-btn secondary w-full gap-2"
                        aria-label={`Open live ${project.title} project`}
                      >
                        <FiExternalLink aria-hidden="true" />
                        Go Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolio-btn secondary w-full gap-2"
                        aria-label={`Open ${project.title} GitHub repository`}
                      >
                        <FaGithub aria-hidden="true" />
                        GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              </Motion.article>
            ))}
          </AnimatePresence>
        </Motion.div>
      </div>
    </section>
  );
}
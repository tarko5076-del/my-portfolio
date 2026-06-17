// Projects.jsx

import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

/* =========================
   PROJECT DATA
========================= */

const projects = [
  {
    id: 1,
    title: 'Ardent Hotel — Guest Services',
    description:
      'A full-stack guest services platform for Ardent Hotel. Guests can browse the menu, manage a cart, and place food orders with cash or chapa checkout.',
    repoUrl: 'https://github.com/tarko5076-del/Ardent-hotel',
    status: 'Fullstack',
  },

  {
    id: 2,
    title: 'Class Award Vote',
    description:
      'A peer voting app built for our class to nominate and vote on end-of-year awards.',
    repoUrl: 'https://github.com/tarko5076-del/telegram-award-vote-2026',
    status: 'Node + React',
  },

  {
    id: 3,
    title: 'Learning Managment system',
    description:
      'a full stack learning management system with react frontend and Django for backend.',
    repoUrl: 'https://github.com/tarko5076-del/learning-management-system',
    status: 'Fullstack',
  },

  {
    id: 4,
    title: 'Apple Home Page Clone',
    description:
      "A responsive recreation of Apple's homepage built with React and Vite.",
    liveUrl: 'https://apple-clone-rupr.vercel.app/',
    repoUrl: 'https://github.com/tarko5076-del/apple-clone',
    status: 'Frontend',
  },

  {
    id: 5,
    title: 'Power Plus Installation',
    description:
      'A brand identity website for an electric company built with React and Vite.',
    liveUrl: 'https://wube-nu.vercel.app',
    repoUrl: 'https://github.com/tarko5076-del/wube',
    status: 'Live',
  },
];

/* =========================
   CARD ANIMATION
========================= */

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/* =========================
   CARD THUMBNAIL
========================= */

function CardThumbnail({ index, status }) {
  return (
    <div className="h-44 border-b border-white/10 relative overflow-hidden bg-[#111]">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b1b1b] via-[#111] to-black" />

      {/* Large Number */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="mono-text text-[5rem] font-bold leading-none text-white/[0.05]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c8ff00]/10 blur-3xl" />

      {/* Status Badge */}
      <div className="absolute left-5 top-5 section-label !mb-0 !text-[0.58rem] z-10">
        <span className="live-dot" />
        {status}
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function Projects() {
  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-inner">

        {/* Section Header */}
        <div className="mb-12 max-w-3xl">

          <div className="section-label">
            <span className="live-dot" />
            Selected Work
          </div>

          <h2 className="section-title">
            Recent <span className="accent">Projects</span>
          </h2>

        </div>

        {/* Project Grid */}
        <Motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="wait">

            {projects.map((project, index) => (
              <Motion.article
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.35,
                  ease: 'easeOut',
                }}
                className="
                  portfolio-card
                  group
                  min-h-[22rem]
                  flex
                  flex-col
                  overflow-hidden
                "
              >

                {/* Thumbnail */}
                <CardThumbnail
                  index={index}
                  status={project.status}
                />

                {/* Card Content */}
                <div className="p-6 flex flex-1 flex-col">

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#f0ede6] mb-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="section-copy mb-8 flex-1">
                    {project.description}
                  </p>

                  {/* Buttons */}
                  <div
                    className={`grid gap-3 ${
                      project.liveUrl && project.repoUrl
                        ? 'sm:grid-cols-2'
                        : ''
                    }`}
                  >

                    {/* Live Button */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          portfolio-btn
                          secondary
                          w-full
                          gap-2
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FiExternalLink />
                        Go Live
                      </a>
                    )}

                    {/* GitHub Button */}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          portfolio-btn
                          secondary
                          w-full
                          gap-2
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FaGithub />
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
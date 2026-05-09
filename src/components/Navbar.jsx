// Navbar.jsx
import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Scroll detection
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id || 'home');
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: '-90px 0px -40% 0px',
      }
    );

    navLinks.forEach((link) => {
      const id = link.href === '#' ? '' : link.href.slice(1);
      const element = id
        ? document.getElementById(id)
        : document.querySelector('section:first-of-type, main > section:first-child, #hero, [data-section="home"]');

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const pathVariants = {
    closed: { d: 'M 4 8 L 20 8 M 4 16 L 20 16' },
    openTop: { d: 'M 6 6 L 18 18' },
    openBottom: { d: 'M 6 18 L 18 6' },
  };

  return (
    <>
      {/* Main Navbar */}
      <Motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Motion.a
            href="#"
            className="text-2xl md:text-3xl font-extrabold text-[#f0ede6]"
            whileHover={{ scale: 1.06, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Tarko<span className="text-accent">.</span>
          </Motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const sectionId = link.href === '#' ? 'home' : link.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <Motion.a
                  key={link.name}
                  href={link.href}
                  className={`mono-text relative text-[0.68rem] transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-white/55 hover:text-[#f0ede6]'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  {isActive && (
                    <Motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-[#c8ff00]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Motion.a>
              );
            })}
          </div>

          {/* Mobile Floating Action Button (hamburger) */}
          <Motion.button
            className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#f0ede6] text-[#0d0d0d] border border-white/20 flex items-center justify-center focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isOpen ? 90 : 0 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <Motion.path
                variants={pathVariants}
                animate={isOpen ? 'openTop' : 'closed'}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
              <Motion.path
                variants={pathVariants}
                animate={isOpen ? 'openBottom' : 'closed'}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </svg>
          </Motion.button>
        </div>
      </Motion.nav>

      {/* Simple dropdown mobile menu (no full-screen) */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[4.5rem] left-0 right-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-5">
              {navLinks.map((link) => {
                const sectionId = link.href === '#' ? 'home' : link.href.slice(1);
                const isActive = activeSection === sectionId;

                return (
                  <Motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`mono-text text-sm transition-colors ${
                      isActive
                        ? 'text-accent'
                        : 'text-white/55 hover:text-[#f0ede6]'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </Motion.a>
                );
              })}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

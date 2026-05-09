// Hero.jsx
import { useEffect, useState } from 'react';

const titles = [
  "Full Stack Developer",
  "React Developer",
  "UI/UX Enthusiast",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typingBase = 60;
  const deletingBase = 35;
  const pauseBeforeDelete = 2200;
  const pauseAfterDelete = 400;

  useEffect(() => {
    if (isPaused) return;

    const currentTitle = titles[titleIndex];
    let delay = 0;
    let nextAction = () => {};

    if (isDeleting) {
      if (currentText === '') {
        delay = pauseAfterDelete;
        nextAction = () => {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        };
      } else {
        delay = deletingBase + Math.random() * 20 - 10;
        nextAction = () => setCurrentText((prev) => prev.slice(0, -1));
      }
    } else {
      if (currentText === currentTitle) {
        delay = pauseBeforeDelete;
        nextAction = () => {
          setIsPaused(false);
          setIsDeleting(true);
        };
      } else {
        delay = typingBase + Math.random() * 50 - 15;
        nextAction = () => setCurrentText((prev) => currentTitle.slice(0, prev.length + 1));
      }
    }

    const timer = setTimeout(nextAction, delay);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, isPaused]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&family=Space+Mono:wght@400;700&display=swap');

        .hero-section {
          min-height: 100vh;
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Space Grotesk', sans-serif;
          padding: 0 1.5rem;
        }

        /* grid background */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 88px 88px;
          pointer-events: none;
          z-index: 0;
        }

        /* radial gradient glow center */
        .hero-section::after {
          content: '';
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          color: rgba(240,237,230,0.4);
          text-transform: uppercase;
          margin-bottom: 1.8rem;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.4rem 0.9rem;
        }

        @keyframes blink-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        .live-dot {
          width: 6px;
          height: 6px;
          background: #c8ff00;
          border-radius: 50%;
          display: inline-block;
          animation: blink-dot 2s infinite;
          flex-shrink: 0;
        }

        .hero-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.4rem, 8vw, 3.8rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f0ede6;
          margin-bottom: 0.5rem;
        }

        .hero-heading-sub {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.4rem, 8vw, 3.8rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f0ede6;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          min-height: 1.2em;
        }

        .typewriter-text {
          color: #c8ff00;
          position: relative;
        }

        @keyframes cursor-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes cursor-glow-pulse {
          0%, 100% { text-shadow: 0 0 8px #c8ff00; }
          50%      { text-shadow: 0 0 20px #c8ff00, 0 0 40px #c8ff00; }
        }
        .cursor {
          font-weight: 300;
          color: #c8ff00;
          animation: cursor-blink 0.9s step-end infinite,
                     cursor-glow-pulse 2s ease-in-out infinite;
        }

        .hero-desc {
          font-size: 1rem;
          color: rgba(240,237,230,0.5);
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 2.5rem;
          max-width: 480px;
        }

        .hero-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
          max-width: 420px;
        }

        .hero-btn {
          background: #0d0d0d;
          color: #f0ede6;
          padding: 1rem 1.4rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          text-align: left;
          text-decoration: none;
          display: block;
          transition: background 0.15s, color 0.15s;
        }
        .hero-btn:hover {
          background: #f0ede6;
          color: #0d0d0d;
        }
        .hero-btn.primary {
          background: #f0ede6;
          color: #0d0d0d;
        }
        .hero-btn.primary:hover {
          background: #c8ff00;
          color: #0d0d0d;
        }

        .hero-scroll {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: rgba(240,237,230,0.2);
          text-transform: uppercase;
        }
        .scroll-line {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      <section id="home" className="hero-section">
        <div className="hero-inner">

          {/* status tag */}
          <div className="hero-tag">
            <span className="live-dot" />
            Available for work
          </div>

          {/* heading */}
          <h1 className="hero-heading">Hi, I'm Tarko -</h1>
          <div className="hero-heading-sub">
            <span className="typewriter-text">
              {currentText}
              <span className="cursor">|</span>
            </span>
          </div>

          {/* description */}
          <p className="hero-desc">
            Building beautiful, fast and scalable web experiences
            with modern JavaScript.
          </p>

          {/* buttons */}
          <div className="hero-btns">
            <a href="/cv.pdf" download className="hero-btn primary">
              Download CV
            </a>
            <a href="#projects" className="hero-btn">
              View Projects
            </a>
          </div>

          {/* scroll hint */}
          <div className="hero-scroll">
            <span className="scroll-line" />
            Scroll to explore
          </div>

        </div>
      </section>
    </>
  );
}

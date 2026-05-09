// Contact.jsx
import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const inputVariants = {
  focus: { y: -2, transition: { duration: 0.2 } },
  blur: { y: 0 },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { y: -2 },
  tap: { scale: 0.98 },
};

const contactItems = [
  { label: 'Email', value: 'tarko5076@gmail.com' },
  { label: 'Based in', value: 'Ethiopia, remote-friendly' },
  { label: 'Available for', value: 'Freelance and full-time' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'sending', text: 'Sending your message...' });

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', text: "Message sent. I'll get back to you soon." });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', text: 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network issue. Check your connection.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <section id="contact" className="portfolio-section">
      <div className="portfolio-inner">
        <div className="mb-12 max-w-3xl">
          <div className="section-label">
            <span className="live-dot" />
            Contact
          </div>
          <h2 className="section-title">
            Let's Create <span className="accent">Together</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          <Motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 space-y-8"
          >
            <div className="space-y-5">
              <h3 className="text-3xl font-bold text-[#f0ede6]">
                Open for new work
              </h3>
              <p className="section-copy">
                Freelance, full-time, or a friendly chat. Drop a message and
                let's turn your idea into a clean web experience.
              </p>
            </div>

            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <Motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  className="portfolio-card p-5"
                >
                  <p className="mono-text text-[0.62rem] text-accent mb-2">
                    {item.label}
                  </p>
                  <p className="font-medium text-[#f0ede6]">{item.value}</p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>

          <Motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="portfolio-card p-6 md:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                {['name', 'email'].map((field) => (
                  <Motion.div key={field} variants={inputVariants} whileFocus="focus">
                    <label htmlFor={field} className="mono-text block text-[0.62rem] text-white/45 mb-3">
                      {field === 'name' ? 'Your Name' : 'Email Address'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="portfolio-input"
                      placeholder={field === 'name' ? 'Tarko' : 'hello@example.com'}
                    />
                  </Motion.div>
                ))}
              </div>

              <div>
                <label htmlFor="subject" className="mono-text block text-[0.62rem] text-white/45 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="portfolio-input"
                  placeholder="Let's build something amazing"
                />
              </div>

              <div>
                <label htmlFor="message" className="mono-text block text-[0.62rem] text-white/45 mb-3">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="portfolio-input resize-none"
                  placeholder="Tell me about your idea, project, or just say hi..."
                />
              </div>

              <Motion.button
                type="submit"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
                className="portfolio-btn w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Motion.button>

              <AnimatePresence>
                {status && (
                  <Motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mono-text text-center text-[0.68rem] ${
                      status.type === 'success'
                        ? 'text-accent'
                        : status.type === 'error'
                        ? 'text-red-300'
                        : 'text-white/50'
                    }`}
                  >
                    {status.text}
                  </Motion.p>
                )}
              </AnimatePresence>
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

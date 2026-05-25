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


// ── Validation rules ──────────────────────────────────────────────
const ETHIOPIAN_PHONE = /^(\+2519|09)\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateForm({ name, phone, email, message }) {
  const errors = {};

  // Name
  if (!name.trim()) {
    errors.name = 'Name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.trim().length > 60) {
    errors.name = 'Name is too long.';
  }

  // Phone
  if (!phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!ETHIOPIAN_PHONE.test(phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid Ethiopian number (09xxxxxxxx or +2519xxxxxxxx).';
  }

  // Email
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  // Message
  if (!message.trim()) {
    errors.message = 'Message is required.';
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (message.trim().length > 1000) {
    errors.message = 'Message is too long (max 1000 characters).';
  }

  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // re-validate the field live once it has been touched
    if (touched[name]) {
      const newErrors = validateForm({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // mark all fields touched so errors show
    setTouched({ name: true, phone: true, email: true, message: true });

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: 'error', text: 'Please fix the errors above before sending.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus({ type: 'sending', text: 'Sending your message...' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/send-telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', text: "Message sent. I'll get back to you soon." });
        setFormData({ name: '', phone: '', email: '', message: '' });
        setTouched({});
      } else {
        const data = await response.json().catch(() => null);
        setStatus({ type: 'error', text: data?.error ?? 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network issue. Check your connection.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  // helper — red border + error message under input
  const fieldClass = (field) =>
    `portfolio-input ${touched[field] && errors[field] ? 'border-red-400/70' : ''}`;

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
          {/* ── Left panel ── */}
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

          {/* ── Form ── */}
          <Motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="portfolio-card p-6 md:p-8 space-y-6" noValidate>

              {/* Name + Phone */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <Motion.div variants={inputVariants} whileFocus="focus">
                  <label htmlFor="name" className="mono-text block text-[0.62rem] text-white/45 mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass('name')}
                    placeholder="Tarko"
                  />
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <Motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mono-text text-[0.6rem] text-red-400 mt-2"
                      >
                        {errors.name}
                      </Motion.p>
                    )}
                  </AnimatePresence>
                </Motion.div>

                {/* Phone */}
                <Motion.div variants={inputVariants} whileFocus="focus">
                  <label htmlFor="phone" className="mono-text block text-[0.62rem] text-white/45 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass('phone')}
                    placeholder="+251 900 000 000"
                  />
                  <AnimatePresence>
                    {touched.phone && errors.phone && (
                      <Motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mono-text text-[0.6rem] text-red-400 mt-2"
                      >
                        {errors.phone}
                      </Motion.p>
                    )} 
                  </AnimatePresence>
                </Motion.div>
              </div>

              {/* Email */}
              <Motion.div variants={inputVariants} whileFocus="focus">
                <label htmlFor="email" className="mono-text block text-[0.62rem] text-white/45 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass('email')}
                  placeholder="you@example.com"
                />
                <AnimatePresence>
                  {touched.email && errors.email && (
                    <Motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mono-text text-[0.6rem] text-red-400 mt-2"
                    >
                      {errors.email}
                    </Motion.p>
                  )}
                </AnimatePresence>
              </Motion.div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mono-text block text-[0.62rem] text-white/45 mb-3">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`${fieldClass('message')} resize-none`}
                  placeholder="Tell me about your idea, project, or just say hi..."
                />
                <div className="flex justify-between items-center mt-2">
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <Motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mono-text text-[0.6rem] text-red-400"
                      >
                        {errors.message}
                      </Motion.p>
                    )}
                  </AnimatePresence>
                  <span className={`mono-text text-[0.6rem] ml-auto ${
                    formData.message.length > 900 ? 'text-red-400' : 'text-white/30'
                  }`}>
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit */}
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
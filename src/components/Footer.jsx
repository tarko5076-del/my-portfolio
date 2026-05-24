import { FaGithub, FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/tarko5076-del', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tarko5076', icon: FaLinkedinIn },
  { label: 'Telegram', href: 'https://t.me/mikios369', icon: FaTelegramPlane },
  { label: 'Instagram', href: 'https://instagram.com/tarko5076', icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer className="py-12 bg-[#0d0d0d] border-t border-white/10 text-center text-white/35">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex justify-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-white/55 transition hover:border-[#c8ff00] hover:text-[#c8ff00]"
              aria-label={`Open ${label} profile`}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mono-text text-[0.62rem]">
          &copy; {new Date().getFullYear()} Tarko. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
}

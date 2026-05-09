export default function Footer() {
  return (
    <footer className="py-12 bg-[#0d0d0d] border-t border-white/10 text-center text-white/35">
      <div className="max-w-7xl mx-auto px-6">
        <p className="mono-text text-[0.62rem]">
          © {new Date().getFullYear()} Tarko. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
}

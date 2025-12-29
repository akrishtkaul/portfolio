// NavigationBar.jsx
import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/ak-logo.png"; // adjust filename if different

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#experience", label: "Work" },
      { href: "#projects", label: "Projects" },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { href: "https://www.linkedin.com/in/akrishtkaul", icon: FaLinkedin, label: "LinkedIn" },
      { href: "https://github.com/akrishtkaul", icon: FaGithub, label: "GitHub" },
      { href: "mailto:akrishtkaul@gmail.com", icon: FaEnvelope, label: "Email" },
    ],
    []
  );

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll while mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 z-50 flex-col items-center justify-between py-8">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md border-r border-white/5" />

        {/* Logo */}
        <a
          href="#"
          className="relative flex items-center justify-center w-14 h-14 rounded-full border border-sky-400/20 bg-sky-400/5 hover:bg-sky-400/15 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden"
        >
          <img
            src={Logo}
            alt="Akrisht Kaul logo"
            className="w-full h-full object-cover transition-opacity duration-300 opacity-95 group-hover:opacity-100"
          />
        </a>

        {/* Nav Links */}
        <nav className="relative flex flex-col gap-12 items-center justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative w-16 h-16 flex items-center justify-center"
            >
              <span
                className="text-sm font-semibold text-white/50 group-hover:text-sky-300 transition-all duration-300 whitespace-nowrap origin-center"
                style={{
                  transform: "rotate(-90deg)",
                  letterSpacing: "0.05em",
                }}
              >
                {link.label}
              </span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-cyan-400 group-hover:w-10 transition-all duration-300 rounded-full group-hover:shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="relative flex flex-col gap-6 items-center">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-sky-300 hover:border-sky-400/40 hover:bg-sky-400/10 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            >
              <social.icon className="text-lg group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            </a>
          ))}
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50">
        <nav className="mx-4 mt-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex h-14 items-center justify-between px-4">
            <a href="#" className="text-white text-lg font-semibold hover:text-sky-300 transition-colors">
              AK
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl hover:text-sky-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {isOpen && (
            <div className="border-t border-white/10 py-4 px-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-sky-300 transition-colors text-xl font-medium"
                >
                  {link.label}
                </a>
              ))}

              <div className="border-t border-white/10 pt-4 flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-white/70 text-lg hover:text-sky-300 transition-colors"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="md:hidden h-20" />
    </>
  );
}


// NavigationBar.jsx
import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes } from "react-icons/fa";
import Logo from "../assets/ak-logo.png";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#experience", label: "Experiences" },
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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Toggle navigation"
          className="fixed left-4 top-4 z-[60] w-14 h-14 rounded-full border border-[#BFDBFE] bg-white shadow-sm overflow-hidden hover:border-[#2563EB] transition"
        >
          <img src={Logo} alt="Akrisht Kaul logo" className="w-full h-full object-cover" />
        </button>
      )}

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/20"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-[#E2E8F0] bg-white transition-transform duration-300 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-5 py-5 border-b border-[#E2E8F0]">
            <span className="text-[#0F172A] font-semibold">Navigation</span>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu" className="text-[#64748B] hover:text-[#2563EB] transition">
              <FaTimes />
            </button>
          </div>

          <nav className="px-5 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-[#334155] hover:text-[#2563EB] text-lg font-medium transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto px-5 py-6 border-t border-[#E2E8F0] flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#BFDBFE] transition"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}


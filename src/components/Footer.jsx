
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-zinc-950 to-black py-12 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Akrisht Kaul · Built with React & Tailwind CSS
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akrishtkaul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-sky-300 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/akrishtkaul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-sky-300 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:akrishtkaul@gmail.com"
              aria-label="Email"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-sky-300 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              <FaEnvelope className="text-lg" />
            </a>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
        
        {/* Additional Info */}
        <p className="text-center text-white/30 text-xs mt-4">
          Designed & Developed with 💙 in New York
        </p>
      </div>
    </footer>
  );
}

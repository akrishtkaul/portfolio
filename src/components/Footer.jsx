import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-[#F8FAFC] py-12 px-4 md:px-8 border-t border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <p className="text-[#64748B] text-sm">
            © {new Date().getFullYear()} Akrisht Kaul · Built with React & Tailwind CSS
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akrishtkaul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-all duration-200"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/akrishtkaul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-all duration-200"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:akrishtkaul@gmail.com"
              aria-label="Email"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-all duration-200"
            >
              <FaEnvelope className="text-lg" />
            </a>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-8 h-px bg-[#E2E8F0]" />
        
        {/* Additional Info */}
        <p className="text-center text-[#94A3B8] text-xs mt-4">
          Designed & Developed in The City That Never Sleeps.
        </p>
      </div>
    </footer>
  );
}

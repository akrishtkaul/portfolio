import { useEffect, useState } from 'react';
import ProfilePicture from './ProfilePicture';
import TypeWriter from './TypeWriter';
import SkillsList from './SkillsList';

import PythonIcon from '../assets/python_logo.png';
import JavaIcon from '../assets/java_icon.png';
import ReactIcon from '../assets/react.svg';
import JSIcon from '../assets/javascript_logo.png';
import CPLusPlus from '../assets/cpp_logo.png';
import AltiumIcon from '../assets/altium_logo.png';
import FigmaIcon from '../assets/figma_logo.png';
import GitIcon from '../assets/git_logo.png';
import NextJsIcon from '../assets/nextjs_logo.png';
import OpenCVIcon from '../assets/opencv_logo.png';
import PGSQLIcon from '../assets/postgresql_logo.png';
import FirebaseIcon from '../assets/firebase_logo.png';
import TypescriptIcon from '../assets/typescript_logo.png';

export default function AboutMe() {
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);

  const softwareSkills = [
    { icon: PythonIcon, label: 'Python' },
    { icon: JavaIcon, label: 'Java' },
    { icon: JSIcon, label: 'JavaScript' },
    { icon: CPLusPlus, label: 'C++' },
    { icon: TypescriptIcon, label: 'TypeScript' },
    { icon: PGSQLIcon, label: 'PSQL' }
  ];

  const frameworksAndTools = [
    { icon: ReactIcon, label: 'React' },
    { icon: GitIcon, label: 'Git' },
    { icon: NextJsIcon, label: 'Next.js' },
    { icon: OpenCVIcon, label: 'OpenCV' },
    { icon: AltiumIcon, label: 'Altium' },
    { icon: FigmaIcon, label: 'Figma' },
    { icon: FirebaseIcon, label: 'Firebase' },
  ];

  const allSkills = [...softwareSkills, ...frameworksAndTools];
  const allSkillsPreview = [...allSkills, ...allSkills];

  useEffect(() => {
    if (!isSkillsModalOpen) return;

    const onEsc = (e) => {
      if (e.key === 'Escape') setIsSkillsModalOpen(false);
    };

    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isSkillsModalOpen]);

  const education = [
    {
      school: 'Columbia University',
      degree: 'B.S. Computer Science',
      duration: 'September 2025 - May 2028',
      awards: [],
    },
    {
      school: 'Boston University',
      degree: 'B.S. Computer Engineering',
      duration: 'September 2024 - May 2025',
      awards: ["Dean's List", 'Distinguished Summer Research Fellow'],
    },
  ];

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-center justify-items-center mb-24">
          
          {/* Profile Picture Column */}
          <div className="w-full max-w-[360px] mx-auto flex justify-center">
            <ProfilePicture />
          </div>

          {/* Text Content Column */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A]">
                Hey, I'm <span className="text-[#2563EB]">Akrisht</span>
              </h1>
              <div className="h-10 text-xl md:text-2xl text-[#2563EB] font-semibold">
                <TypeWriter className="!text-[#2563EB]" />
              </div>
            </div>

            <div className="space-y-4 text-[#475569] text-base md:text-lg leading-relaxed">
              <p>
                Whether it is building a full stack web app, designing firmware for a car, or shipping an AI feature, I love taking ideas from concept to reality. I have a strong foundation in software engineering with experience across the stack, and I enjoy working on projects that combine hardware and software in creative ways.
              </p>

              <p>
                I'm passionate about understanding user needs and approaching problems with a product mindset. I bring experience in user-centered thinking, prioritization, and execution, with a focus on turning ideas into practical, user-facing features.
              </p>

              <p className="text-slate-500 italic">
                When I'm not coding or sketching circuits, you'll find me making music, breakdancing, or grappling with my sparring mates. 
              </p>
            </div>
          </div>
        </div>


        {/* Skills Conveyor (unchanged structure, light-compatible) */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 mb-24">
          <button
            type="button"
            onClick={() => setIsSkillsModalOpen(true)}
            className="w-full text-left px-4 md:px-10 hover:opacity-90 transition-opacity"
            aria-label="Open full skills list"
          >
            <div className="conveyor-wrap w-full">
              <div className="conveyor-track py-5">
                {allSkillsPreview.map((skill, idx) => (
                  <img
                    key={`${skill.label}-${idx}`}
                    src={skill.icon}
                    alt={skill.label}
                    title={skill.label}
                    loading="lazy"
                    className="conveyor-logo"
                  />
                ))}
              </div>
            </div>
          </button>
        </div>

      

        {/* Education Section */}
        <div className="space-y-5 mb-24">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Education</h2>
            <div className="flex-grow h-px bg-[#E2E8F0]" />
          </div>

          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E2E8F0] bg-white px-6 md:px-7 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#0F172A]">{edu.school}</h3>
                    <p className="text-sm md:text-base text-[#2563EB]">{edu.degree}</p>
                  </div>
                  <p className="text-xs md:text-sm text-[#64748B] whitespace-nowrap">{edu.duration}</p>
                </div>

                {edu.awards.length > 0 && (
                  <p className="mt-2.5 text-sm text-[#334155]">
                    <span className="font-medium text-[#0F172A]">Honors:</span>{" "}
                    {edu.awards.join(" • ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Modal */}
        {isSkillsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 skills-fade-in" role="dialog" aria-modal="true" aria-label="Skills">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/30 skills-backdrop-fade-in"
              onClick={() => setIsSkillsModalOpen(false)}
              aria-label="Close skills modal"
            />
            <div className="relative w-full max-w-5xl rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] skills-panel-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A]">Skills</h3>
                <button
                  type="button"
                  onClick={() => setIsSkillsModalOpen(false)}
                  className="rounded-md border border-[#E2E8F0] px-3 py-1.5 text-sm text-[#475569] hover:text-[#1D4ED8] hover:border-[#BFDBFE]"
                >
                  Close
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 rounded-2xl border border-slate-300/70 bg-slate-900/[0.04] backdrop-blur-sm p-7">
                  <h4 className="text-lg font-semibold text-[#2563EB] uppercase tracking-widest">Software</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <SkillsList skills={softwareSkills} />
                  </div>
                </div>
                <div className="space-y-4 rounded-2xl border border-slate-300/70 bg-slate-900/[0.04] backdrop-blur-sm p-7">
                  <h4 className="text-lg font-semibold text-[#2563EB] uppercase tracking-widest">Frameworks & Tools</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <SkillsList skills={frameworksAndTools} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

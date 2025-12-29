import ProfilePicture from './ProfilePicture';
import TypeWriter from './TypeWriter';
import SkillsList from './SkillsList';

import PythonIcon from '../assets/python_logo.png';
import JavaIcon from '../assets/java_icon.png';
import ReactIcon from '../assets/react.svg';
import JSIcon from '../assets/javascript_logo.png';
import CPLusPlus from '../assets/cpp_logo.png';
import AltiumIcon from '../assets/altium_logo.png';
import ArduinoIcon from '../assets/arduino_logo.png';
import FigmaIcon from '../assets/figma_logo.png';
import GitIcon from '../assets/git_logo.png';
import NextJsIcon from '../assets/nextjs_logo.png';
import OpenCVIcon from '../assets/opencv_logo.png';
import PGSQLIcon from '../assets/postgresql_logo.png';
import FirebaseIcon from '../assets/firebase_logo.png';
import TypescriptIcon from '../assets/typescript_logo.png';

export default function AboutMe() {
  const softwareSkills = [
    { icon: PythonIcon, label: 'Python' },
    { icon: JavaIcon, label: 'Java' },
    { icon: JSIcon, label: 'JavaScript' },
    { icon: CPLusPlus, label: 'C++' },
    { icon: TypescriptIcon, label: 'TypeScript' },
    {icon: PGSQLIcon, label: 'PostgreSQL' }
  ];

  const frameworksAndTools = [
    { icon: ReactIcon, label: 'React' },
    { icon: GitIcon, label: 'Git' },
    { icon: NextJsIcon, label: 'Next.js' },
    { icon: OpenCVIcon, label: 'OpenCV' },
    { icon: AltiumIcon, label: 'Altium' },
    { icon: FigmaIcon, label: 'Figma' },
    {icon: FirebaseIcon, label: 'Firebase' },
    
  ];

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
    <section className="min-h-screen bg-zinc-900 py-20 md:ml-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Hero Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start justify-items-center lg:justify-items-start mb-24">
          
          {/* Profile Picture Column */}
          <div className="w-full max-w-[360px]">
            <ProfilePicture />
          </div>

          {/* Text Content Column */}
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">Akrisht</span>
              </h1>
              <div className="h-10 text-xl md:text-2xl text-sky-300 font-semibold">
                <TypeWriter />
              </div>
            </div>

            <div className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed">
              <p>
                I build full stack products end to end. I focus on clean React frontends backed by Java or Python services, and I am comfortable working closer to the system when needed. I have also designed and tested custom PCBs in Altium, which gives me a strong understanding of how software and hardware connect in real projects.
              </p>

              <p>
                I also work in ML and AI with an emphasis on shipping practical, user facing features. Alongside engineering, I bring a PM mindset by defining the problem, prioritizing effectively, and driving execution so ideas turn into real outcomes.
              </p>

              <p className="text-white/60 italic">
                When I'm not coding or sketching circuits, you'll find me making music, breakdancing, or perfecting my kickboxing technique.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-8 mb-24">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-sky-400/50 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Software Skills */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6">
              <h3 className="text-lg font-semibold text-sky-300 uppercase tracking-widest">Software</h3>
              <div className="grid grid-cols-3 gap-4">
                <SkillsList skills={softwareSkills} />
              </div>
              
            </div>

            {/* Frameworks and Tools Skills */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6">
              <h3 className="text-lg font-semibold text-sky-300 uppercase tracking-widest">Frameworks & Tools</h3>
              <div className="grid grid-cols-3 gap-4">
                <SkillsList skills={frameworksAndTools} />
              </div>
              
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-8 mb-24">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Education</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-sky-400/50 to-transparent" />
          </div>

          <div className="space-y-5">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="group relative border border-white/10 rounded-2xl p-6 md:p-7 bg-zinc-950/40 backdrop-blur hover:bg-zinc-950/60 transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,152,245,0.1)]"
              >
                {/* Accent Line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-400 to-cyan-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="grid md:grid-cols-3 gap-4">
                  {/* School & Degree */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                      {edu.school}
                    </h3>
                    <p className="text-sky-300/80 text-base md:text-lg font-semibold mb-2">{edu.degree}</p>
                    <p className="text-white/50 text-sm">{edu.duration}</p>
                  </div>

                  {/* Awards */}
                  <div className="md:col-span-1">
                    {edu.awards.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-sky-300 uppercase tracking-widest opacity-70">Honors</p>
                        {edu.awards.map((award, aIdx) => (
                          <p key={aIdx} className="text-white/70 text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">★</span>
                            {award}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

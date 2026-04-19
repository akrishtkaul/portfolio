import { useEffect, useRef, useState } from 'react';

export default function Projects() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(() => new Set());
  const cardRefs = useRef(new Map());

  const projects = [
    {
      title: 'FitBro',
      period: 'April 2026 - Present',
      blurb: 'Full-stack AI fitness trainer with RAG-based chat that retrieves workout history to deliver personalized advice.',
      tags: ['React', 'FastAPI', 'MongoDB Atlas', 'OpenAI API'],
      details: [
        'Built a full-stack AI fitness trainer with RAG-based chat that retrieves workout history to deliver personalized advice via GPT-4o mini',
        'Integrated 1,300+ exercise library with auto-save persistence and real-time search; working towards AWS deployment and progressive overload tracking'
      ]
    },
    {
      title: 'StonksGPT',
      period: 'February 2026',
      blurb: 'Agentic trading copilot to make stock trading accessible to beginners via voice-driven LLM tool execution.',
      tags: ['React', 'Node.js', 'Gemini API', 'Python'],
      details: [
        'Built an agentic trading copilot where users interact via voice with an LLM that executes schema-validated trades, tracks portfolios, and delivers real-time market news',
        'Prevented hallucinations through structured audit trails, validated across 50+ test trades'
      ]
    },
    {
      title: 'What Makes Songs Pop',
      period: 'April 2026',
      blurb: 'Data analysis of 114K songs to identify the statistical drivers of music popularity using ML.',
      tags: ['Python', 'pandas', 'SQLite3', 'scikit-learn'],
      details: [
        'Analyzed 114K songs across 114 genres using linear regression and K-means clustering to identify what makes songs popular',
        'Found "instrumentalness" as the strongest predictor (r=−0.095) and that the energetic cluster produces 60% of top-1% hits despite lower average popularity'
      ]
    },
    {
      title: 'Add Up Café',
      period: 'December 2025 - January 2026',
      blurb: 'Full-stack classroom management platform with gamified learning for a special-education environment.',
      tags: ['Next.js', 'Tailwind', 'Shadcn', 'Firebase'],
      details: [
        'Built and deployed a full-stack classroom management platform to Vercel with role-based user flows, assignment tracking, and gamified learning features',
        'Iterated directly with a special-education teacher and 15 students in a live classroom setting to refine UX and feature reliability'
      ]
    },
    {
      title: 'Computer Keyboard Detection',
      blurb: 'Trained YOLOv8 model achieving 85% detection accuracy for real-time keyboard identification in video streams.',
      tags: ['Python', 'OpenCV', 'YOLOv8', 'ML'],
      details: [
        'Trained YOLOv8 on custom dataset to reach 85% real-time detection accuracy',
        'Built OpenCV pipeline with bounding-box refinement for Mars Rover constraints',
        'Optimized inference via quantization on resource-limited hardware'
      ]
    },
    {
      title: 'HTSwireHarness PCB',
      blurb: 'Custom PCB for Horizontal Test Stand; full schematic design to Gerber fabrication.',
      tags: ['Altium', 'Schematic Design', 'PCB Layout'],
      details: [
        'Created full Altium schematic to Gerbers with custom footprints and DRC compliance',
        'Simplified wire-harness integration with clean routing and power distribution',
        'Coordinated fabrication to achieve first-pass success with zero defects'
      ]
    }
    /*{
      title: 'FRC Ivan 3.0',
      blurb: 'Java-controlled robot with CAN bus wiring; led programming team to school\'s top finish in 15 years.',
      tags: ['Java', 'CAN-BUS Wiring', 'Robotics'],
      details: [
        'Led team of 8 to build full robot control stack in Java with CAN bus networking',
        'Developed autonomous routines using trajectory planning and vision targeting',
        'Drove school’s best regional finish in 15 years through iterative testing'
      ]
    }*/
  ];

  const handleCardClick = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('data-project-id');
          if (!id) return;

          setVisibleCards((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            return next;
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">Projects</h2>
          <a
            href="https://github.com/akrishtkaul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64748B] hover:text-[#0F172A] transition-colors duration-200 flex-shrink-0"
            aria-label="GitHub profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <div className="flex-grow section-divider" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const id = `project-${idx}`;
            const isVisible = visibleCards.has(id);

            return (
              <div
                key={idx}
                data-project-id={id}
                ref={(el) => {
                  if (el) cardRefs.current.set(id, el);
                  else cardRefs.current.delete(id);
                }}
                className={`relative h-[26rem] cursor-pointer perspective-1000 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                onClick={() => handleCardClick(idx)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform: flippedCard === idx ? 'rotateY(180deg) translateZ(0)' : 'rotateY(0deg) translateZ(0)'
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg) translateZ(1px)'
                    }}
                  >
                    <div className="h-full border border-[#E2E8F0] rounded-2xl p-6 bg-white hover:bg-[#F1F5F9] transition-all duration-200 hover:border-[#BFDBFE] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_10px_26px_rgba(15,23,42,0.07)] flex flex-col group">
                      {/* Accent Corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFF6FF] to-transparent rounded-tr-2xl" />
                        
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 relative z-10">
                        {project.title}
                      </h3>

                      {project.period && (
                        <p className="text-xs text-[#64748B] mb-3">{project.period}</p>
                      )}

                      <p className="text-[#334155] text-sm leading-relaxed mb-4 flex-grow">
                        {project.blurb}
                      </p>
                        
                      <div className="flex flex-wrap gap-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3.5 py-1.5 text-[13px] font-medium rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(1px)'
                    }}
                  >
                    <div className="h-full border border-blue-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col overflow-hidden">
                      <h3 className="text-xl font-bold text-[#1D4ED8] mb-2">
                        {project.title}
                      </h3>

                      {project.period && (
                        <p className="text-xs text-[#64748B] mb-4">{project.period}</p>
                      )}

                      <ul className="space-y-2.5 flex-grow pr-1">
                        {project.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-[#475569] text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-[#2563EB] mt-1 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

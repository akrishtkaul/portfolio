import { useState } from 'react';

export default function Projects() {
  const [flippedCard, setFlippedCard] = useState(null);

  const projects = [
    {
      title: 'SQIRL',
      period: 'March 2026 - Present',
      blurb: 'Full-stack social platform startup project focused on gamified local food and cultural discovery.',
      tags: ['Node.js (Express)', 'React', 'SQL', 'AWS'],
      details: [
        'Collaborating in a startup team to build a full-stack social platform that gamifies discovering local food and cultural experiences through quest creation, community feeds, and user engagement features',
        'Designing and testing core product flows, data models, and interaction logic for a gamified MVP, demonstrating adaptability in shipping new features across the stack in a fast-moving environment'
      ]
    },
    {
      title: 'StonksGPT',
      period: 'February 2026',
      blurb: 'Agentic trading copilot that turns natural-language requests into constrained, auditable tool execution.',
      tags: ['Node.js (Express)', 'Python (MCP)', 'Gemini API', 'React'],
      details: [
        'Built an agentic trading copilot that translates natural-language requests into constrained, auditable tool executions using Python-based tooling, LLM reasoning, and real-time portfolio context',
        'Implemented a backend system with validated tool schemas, token-efficient context compression, and market and news pipelines, using caching to support portfolio analytics, sessions, and voice-enabled interactions at low latency'
      ]
    },
    {
      title: 'Add Up Café',
      period: 'December 2025 - January 2026',
      blurb: 'Full-stack classroom management platform with gamified learning for a special-education environment.',
      tags: ['React', 'Next.js', 'Tailwind', 'Firebase'],
      details: [
        'Built a full-stack classroom management platform with role-based user flows, assignment tracking, and gamified learning features for a special education setting',
        'Iterated on system design, UX flows, and feature reliability through direct user feedback in a live special-education setting, supporting approximately 15 students and demonstrating rapid learning and end-to-end ownership'
      ]
    },
    {
      title: 'Computer Keyboard Detection',
      blurb: 'Trained YOLOv8 model achieving 85% detection accuracy for real-time keyboard identification in video streams.',
      tags: ['Python', 'OpenCV', 'YOLOv8', 'Machine Learning'],
      details: [
        'Trained YOLOv8 on custom dataset to reach 85% real-time detection accuracy',
        'Built OpenCV pipeline with bounding-box refinement for Mars Rover constraints',
        'Optimized inference via quantization on resource-limited hardware'
      ]
    },
    {
      title: 'DollarLearn',
      blurb: '2nd place hackathon winner – Financial literacy app helping international students navigate settling finances.',
      tags: ['React', 'Bootstrap', 'Hackathon'],
      details: [
        'Won 2nd place (25 teams) after 48-hour sprint with responsive React + Bootstrap app',
        'Interviewed international students and turned complex finance flows into simple steps',
        'Shipped core flows and feature requirements for post-hackathon roadmap'
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

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">Projects</h2>
          <div className="flex-grow section-divider" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative h-[26rem] cursor-pointer perspective-1000"
              onClick={() => handleCardClick(idx)}
            >
              {/* Card Container with 3D transform */}
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  flippedCard === idx ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === idx ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="h-full border border-[#E2E8F0] rounded-2xl p-6 bg-white transition-all duration-200 hover:border-[#BFDBFE] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_10px_26px_rgba(15,23,42,0.07)] flex flex-col group">
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
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
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
          ))}
        </div>
      </div>
    </section>
  );
}

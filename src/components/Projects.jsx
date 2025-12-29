import { useState } from 'react';

export default function Projects() {
  const [flippedCard, setFlippedCard] = useState(null);

  const projects = [
    {
      title: 'Add Up Café',
      blurb: 'Full-stack Next.js web app with gamified math practice for special-education learners using Firebase Auth and Firestore.',
      tags: ['React', 'Next.js', 'Tailwind', 'Firebase', 'PostgreSQL'],
      details: [
        'Interviewed special-education teachers and built gamified scoring/UX for neurodiverse students',
        'Implemented Firebase Auth + Firestore with accessible component library and low cognitive load',
        "Piloted the app with my mother's special-education class to validate engagement and usability"
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
      title: 'Rocket Nozzle (HIP Project)',
      blurb: 'Designed nozzle in SolidWorks and programmed Arduino for automated actuation; integrated with soldered wiring.',
      tags: ['SolidWorks', 'Arduino', 'Soldering'],
      details: [
        'Designed aerodynamic nozzle in SolidWorks with iterative test-driven refinements',
        'Built Arduino control system for automated fluid actuation and monitoring',
        'Soldered and integrated electrical + mechanical systems for flight tests'
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
    },
    {
      title: 'FRC Ivan 3.0',
      blurb: 'Java-controlled robot with CAN bus wiring; led programming team to school\'s top finish in 15 years.',
      tags: ['Java', 'CAN-BUS Wiring', 'Robotics'],
      details: [
        'Led team of 8 to build full robot control stack in Java with CAN bus networking',
        'Developed autonomous routines using trajectory planning and vision targeting',
        'Drove school’s best regional finish in 15 years through iterative testing'
      ]
    }
  ];

  const handleCardClick = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-zinc-900 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-sky-400/50 to-transparent" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative h-80 cursor-pointer perspective-1000"
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
                  <div className="h-full border border-white/10 rounded-2xl p-6 bg-zinc-950/40 backdrop-blur hover:bg-zinc-950/60 transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] flex flex-col group">
                    {/* Accent Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sky-400/10 to-transparent rounded-tr-2xl" />
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors relative z-10">
                      {project.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-4 flex-grow">
                      {project.blurb}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/20"
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
                  <div className="h-full border border-sky-400/30 rounded-2xl p-6 bg-zinc-950/60 backdrop-blur shadow-[0_0_30px_rgba(56,189,248,0.15)] flex flex-col overflow-y-auto no-scrollbar">
                    <h3 className="text-xl font-bold text-sky-300 mb-4">
                      {project.title}
                    </h3>
                    
                    <ul className="space-y-3 flex-grow pr-1">
                      {project.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-white/70 text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
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

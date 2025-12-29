import { useState } from 'react';

export default function Projects() {
  const [flippedCard, setFlippedCard] = useState(null);

  const projects = [
    {
      title: 'Add Up Café',
      blurb: 'Full-stack Next.js web app with gamified math practice for special-education learners using Firebase Auth and Firestore.',
      tags: ['React', 'Next.js', 'Tailwind', 'Firebase', 'PostgreSQL'],
      details: [
        'Building full-stack Next.js web app with Firebase Auth and Firestore for real-time data synchronization',
        'Conducted classroom interviews with special-education teachers to understand pain points and engagement barriers',
        'Designed gamified scoring logic and low-friction UX to keep neurodiverse students engaged without feeling overwhelmed',
        'Implemented accessible component library with focus on cognitive load and visual clarity',
        'Integrated PostgreSQL for persistent analytics and student progress tracking across sessions'
      ]
    },
    {
      title: 'Computer Keyboard Detection',
      blurb: 'Trained YOLOv8 model achieving 85% detection accuracy for real-time keyboard identification in video streams.',
      tags: ['Python', 'OpenCV', 'YOLOv8', 'Machine Learning'],
      details: [
        'Achieved 85% keyboard detection accuracy in real-time video by training YOLOv8 on custom dataset',
        'Built OpenCV pipeline for autonomous keyboard identification and bounding box refinement',
        'Developed for Mars Rover competition with strict real-time performance constraints',
        'Optimized model inference on resource-constrained hardware using quantization techniques',
        'Created annotation pipeline and data augmentation strategy to improve model robustness'
      ]
    },
    {
      title: 'DollarLearn',
      blurb: '2nd place hackathon winner – Financial literacy app helping international students navigate settling finances.',
      tags: ['React', 'Bootstrap', 'Hackathon'],
      details: [
        'Secured 2nd place out of 25 teams at Boston University hackathon in 48-hour sprint',
        'Conducted user research interviews with international students to identify key pain points in settling finances',
        'Designed intuitive user flows translating complex financial processes into simple, actionable steps',
        'Built responsive React app with Bootstrap for quick iteration and clean UI',
        'Created feature requirement documentation based on user feedback for post-hackathon development'
      ]
    },
    {
      title: 'Rocket Nozzle (HIP Project)',
      blurb: 'Designed nozzle in SolidWorks and programmed Arduino for automated actuation; integrated with soldered wiring.',
      tags: ['SolidWorks', 'Arduino', 'Soldering'],
      details: [
        'Engineered rocket nozzle design in SolidWorks with precise aerodynamic specifications for high-performance propulsion',
        'Developed Arduino control system for automated fluid actuation sequences with real-time monitoring',
        'Hand-soldered all electrical connections ensuring robust field operation under extreme conditions',
        'Integrated mechanical and electrical systems for seamless operation during test flights',
        'Performed iterative testing and refinement based on launch data and telemetry feedback'
      ]
    },
    {
      title: 'HTSwireHarness PCB',
      blurb: 'Custom PCB for Horizontal Test Stand; full schematic design to Gerber fabrication.',
      tags: ['Altium', 'Schematic Design', 'PCB Layout'],
      details: [
        'Designed complete PCB schematic from concept to production-ready Gerber files in Altium Designer',
        'Simplified complex wire harness integration for Horizontal Test Stand with clean signal routing',
        'Created custom component footprints and maintained rigorous design rule checks for manufacturability',
        'Coordinated with manufacturing team ensuring successful first-pass fabrication with zero defects',
        'Implemented power distribution and signal integrity analysis for reliable high-frequency operations'
      ]
    },
    {
      title: 'FRC Ivan 3.0',
      blurb: 'Java-controlled robot with CAN bus wiring; led programming team to school\'s top finish in 15 years.',
      tags: ['Java', 'CAN-BUS Wiring', 'Robotics'],
      details: [
        'Led programming team of 8 students to develop complete robot control system in Java',
        'Implemented CAN bus communication protocol for distributed sensor network across robot subsystems',
        'Achieved school\'s highest regional competition ranking in 15 years through iterative testing and optimization',
        'Designed autonomous routines using trajectory planning and vision-based target tracking',
        'Mentored junior programmers in robotics software development and debugging techniques'
      ]
    }
  ];

  const handleCardClick = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-20 px-4 md:px-8">
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

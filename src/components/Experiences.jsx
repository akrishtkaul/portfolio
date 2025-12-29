export default function Experiences() {
  const experiences = [
    {
      title: 'Storage Buddy',
      organization: 'Columbia Build Lab',
      duration: 'September 2025 - Present',
      year: '2025',
      duties: [
        'Building production chat (JavaScript) with regex input validation and AI-assisted moderation',
        'Wrote lightweight API tests and message threading logic, instrumented basic logs for debugging',
        'Partnered with PM/design in Figma/Miro; translated flows into tickets and shipped iteratively'
      ],
      side: 'left'
    },
    {
      title: 'Columbia Formula SAE',
      organization: '',
      duration: 'September 2025 - Present',
      year: '2025',
      duties: [
        'Programming embedded C++ firmware and PCB systems enabling real-time data flow across CAN bus',
        'Designing PCB for HV electronics such as ready-to-start system',
      ],
      side: 'right'
    },
    {
      title: 'Boston University Rocket Propulsion Club',
      organization: '',
      duration: 'September 2024 - August 2025',
      year: '2024',
      duties: [
        'Developed PCB to interface with Horizontal Test Stand, from schematic to Gerbers, cleaning up wiring',
        'Designed eMMC flash and altimeter schematics for Argo (Typhus FC), including custom library parts',
        'Programmed Arduino + designed SolidWorks nozzle (HIP Project) for automated fluid actuation',
      ],
      side: 'left'
    },
    {
      title: 'Engineers Without Borders',
      organization: 'Boston University Chapter',
      duration: 'September 2024 - May 2025',
      year: '2024',
      duties: [
        'Fundraised $4,000+ through public events for Kenya borehole project',
        'Led workshops and STEM outreach to engage students in science and engineering',
      ],
      side: 'right'
    },
  ];

  return (
    <section className="min-h-screen bg-zinc-950 py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experience</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-sky-400/50 to-transparent" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-sky-400 via-cyan-400 to-sky-400" />

          {/* Vertical Line - Mobile (left side) */}
          <div className="lg:hidden absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-sky-400 via-cyan-400 to-sky-400" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                {/* Year Marker on Timeline */}
                <div className="absolute left-6 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 top-8 z-10">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-sky-400 bg-zinc-950 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                    <span className="text-sky-300 font-bold text-xs lg:text-sm">{exp.year}</span>
                  </div>
                </div>

                {/* Experience Card */}
                <div className="pl-20 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-8">
                  {/* Spacer for alternating sides on desktop */}
                  <div className={`hidden lg:block ${exp.side === 'right' ? 'lg:col-start-1' : 'lg:col-start-2'}`} />
                  
                  {/* Card Content */}
                  <div className={`${exp.side === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'} group`}>
                    <div className="relative border border-white/10 rounded-2xl p-5 lg:p-6 bg-zinc-950/40 backdrop-blur hover:bg-zinc-950/60 transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                      
                      {/* Connecting Line to Timeline - Desktop */}
                      <div className={`hidden lg:block absolute top-8 w-8 h-0.5 bg-gradient-to-r ${exp.side === 'left' ? 'right-0 translate-x-full from-sky-400/50 to-transparent' : 'left-0 -translate-x-full from-transparent to-sky-400/50'}`} />
                      
                      {/* Connecting Line to Timeline - Mobile */}
                      <div className="lg:hidden absolute left-0 top-8 w-12 h-0.5 -translate-x-full bg-gradient-to-l from-sky-400/50 to-transparent" />
                      
                      {/* Accent Corner */}
                      <div className="absolute top-0 left-0 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-sky-400/10 to-transparent rounded-tl-2xl" />
                      
                      {/* Content */}
                      <div className="relative">
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                          {exp.title}
                        </h3>
                        {exp.organization && (
                          <p className="text-sky-300/80 text-sm lg:text-base font-semibold mb-2">{exp.organization}</p>
                        )}
                        <p className="text-white/50 text-xs lg:text-sm mb-4">{exp.duration}</p>
                        
                        <ul className="space-y-2">
                          {exp.duties.map((duty, dIdx) => (
                            <li key={dIdx} className="text-white/70 text-xs lg:text-sm leading-relaxed flex items-start gap-2">
                              <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Experiences() {
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const [visibleCards, setVisibleCards] = useState(() => new Set());
  const cardRefs = useRef(new Map());

  const experiences = [
    {
      id: 'ewb-2024',
      year: 2024,
      title: 'Engineers Without Borders',
      position: 'Fundraising Lead',
      duties: [
        'Fundraised $4,000+ through public events for Kenya borehole project',
        'Led workshops and STEM outreach to engage students in science and engineering'
      ]
    },
    {
      id: 'rocket-2024',
      year: 2024,
      title: 'Boston University Rocket Propulsion Group',
      position: 'Avionics Team',
      duties: [
        'Designed an eMMC storage expansion module in Altium, doubling flight computer storage capacity from 2GB to 4GB',
        'Supported multiple schematic and PCB design iterations'
      ]
    },
    {
      id: 'rastic-2024',
      year: 2024,
      title: 'BU RASTIC',
      position: 'Robotics Assistant',
      duties: [
        'Engineered ROS/Python autonomous driving logic for AgileX robot cars by integrating five waypoint-based highway simulation tracks and refining path-following behavior, improving trajectory smoothness by 30%',
        'Developed validation test cases and performed iterative PID tuning in a Linux-based simulation stack, increasing lap completion rate from 75% to 85%'
      ]
    },
    {
      id: 'storage-2025',
      year: 2025,
      title: 'Storage Buddy',
      position: 'Full Stack Intern',
      duties: [
        'Built an in-app messaging system with RESTful APIs for a storage marketplace, shipping features in weekly iteration cycles to implement profanity filtering, email/phone masking, and user blocking for 50+ users across Boston & NYC',
        'Iterated on chat UI and messaging workflows through rapid feedback-driven development, refining features and resolving usability issues to improve the end-to-end messaging experience'
      ]
    },
    {
      id: 'fsae-2025',
      year: 2025,
      title: 'Columbia FSAE',
      position: 'Electrical & Software Team Member',
      duties: [
        'Developing embedded C firmware for the ADBMS6830 to stream telemetry (14 cell voltages and temperatures) to a monitoring UI',
        'Reduced refresh latency to ~750 ms and implemented cell-balancing control logic'
      ]
    }
  ];

  const groupedByYear = useMemo(() => {
    const map = new Map();
    const sorted = [...experiences].sort((a, b) => b.year - a.year);
    for (const exp of sorted) {
      if (!map.has(exp.year)) map.set(exp.year, []);
      map.get(exp.year).push(exp);
    }
    return Array.from(map.entries()).map(([year, items]) => ({ year, items }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('data-exp-id');
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
  }, [groupedByYear]);

  let timelineIndex = 0;

  return (
    <section className="bg-[#F8FAFC] py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Experience</h2>
          <div className="flex-grow section-divider" />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-[#BFDBFE]" />
          <div className="lg:hidden absolute left-5 top-0 w-0.5 h-full bg-[#BFDBFE]" />

          <div className="space-y-6">
            {groupedByYear.map((group) => (
              <div key={group.year} className="space-y-5">
                <div className="relative h-10">
                  <div className="absolute left-5 lg:left-1/2 lg:-translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-10 h-10 rounded-full border border-[#93C5FD] bg-[#EFF6FF] flex items-center justify-center">
                      <span className="text-[#1D4ED8] font-bold text-xs">{group.year}</span>
                    </div>
                  </div>
                </div>

                {group.items.map((exp) => {
                  const side = timelineIndex % 2 === 0 ? 'left' : 'right';
                  timelineIndex += 1;
                  const isOpen = activeExperienceId === exp.id;
                  const isVisible = visibleCards.has(exp.id);

                  return (
                    <div
                      key={exp.id}
                      className="relative"
                      data-exp-id={exp.id}
                      ref={(el) => {
                        if (el) cardRefs.current.set(exp.id, el);
                        else cardRefs.current.delete(exp.id);
                      }}
                    >
                      <div className="pl-14 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-6">
                        <div className={`hidden lg:block ${side === 'right' ? 'lg:col-start-1' : 'lg:col-start-2'}`} />

                        <div className={`${side === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'} group`}>
                          <button
                            type="button"
                            onClick={() => setActiveExperienceId(isOpen ? null : exp.id)}
                            className={`w-full text-left relative border border-[#E2E8F0] rounded-xl p-4 lg:p-5 bg-white hover:border-[#BFDBFE] shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-500 ${
                              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                          >
                            <div
                              className={`hidden lg:block absolute top-7 w-6 h-0.5 bg-gradient-to-r ${
                                side === 'left'
                                  ? 'right-0 translate-x-full from-blue-200 to-transparent'
                                  : 'left-0 -translate-x-full from-transparent to-blue-200'
                              }`}
                            />
                            <div className="lg:hidden absolute left-0 top-7 w-8 h-0.5 -translate-x-full bg-gradient-to-l from-blue-200 to-transparent" />

                            <h3 className="text-base lg:text-lg font-bold text-[#0F172A]">{exp.title}</h3>
                            <p className="text-[#2563EB] text-xs lg:text-sm font-semibold mt-0.5">{exp.position}</p>

                            <div
                              className={`overflow-hidden transition-[max-height,opacity,transform,margin] duration-300 ease-out ${
                                isOpen ? 'max-h-72 opacity-100 translate-y-0 mt-3' : 'max-h-0 opacity-0 -translate-y-1 mt-0'
                              }`}
                              aria-hidden={!isOpen}
                            >
                              <ul className="space-y-2.5 pb-0.5">
                                {exp.duties.map((duty, idx) => (
                                  <li key={idx} className="text-[#334155] text-sm leading-relaxed flex items-start gap-2">
                                    <span className="text-[#2563EB] mt-1 flex-shrink-0">•</span>
                                    <span>{duty}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
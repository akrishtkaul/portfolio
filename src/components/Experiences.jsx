import './Experiences.css';

export default function Experiences() {
  const experiences = [
    {
      title: 'Storage Buddy (Columbia Build Lab)',
      duration: 'September 2025 - Present',
      duties: [
        'Building production chat (JavaScript) with regex input validation and AI-assisted moderation',
        'Wrote lightweight API tests and message threading logic, instrumented basic logs for debugging',
        'Partnered with PM/design in Figma/Miro; translated flows into tickets and shipped iteratively'
      ],
    },
    {
      title: 'Columbia Formula SAE',
      duration: 'September 2025 - Present',
      duties: [
        'Programming embedded C++ firmware and PCB systems enabling real-time data flow across CAN bus',
        'Designing PCB for HV electronics such as ready-to-start system',
      ],
    },
    {
      title: 'Boston University Rocket Propulsion Club',
      duration: 'September 2024 - August 2025',
      duties: [
        'Developed PCB to interface with Horizontal Test Stand, from schematic to Gerbers, cleaning up wiring.',
        'Designed eMMC flash and altimeter schematics for Argo (Typhus FC), including custom library parts.',
        'Programmed Arduino + designed SolidWorks nozzle (HIP Project) for automated fluid actuation.',
      ],
    },
    {
      title: 'Engineers Without Borders, Boston University Chapter',
      duration: 'September 2024 - May 2025',
      duties: [
        'Fundraised $4,000+ through public events for Kenya borehole project.',
        'Led workshops and STEM outreach to engage students in science and engineering.',
      ],
    },
    /*
    {
      title: 'FIRST Robotics Competition Team [569]',
      duration: 'September 2022 - June 2024',
      duties: [
        'Programmed robot control systems in Java for autonomous and teleop tasks.',
        'Worked with CAN bus and electrical wiring to integrate subsystems.',
        'Collaborated with mechanical and electrical teams to deliver competition-ready robots.',
      ],
    }, */
  ];

  return (
    <div className='section-container'>
      <div className='panel'>
        <h2>Experience</h2>
        {experiences.map((exp, i) => (
          <div key={i} className='experience-item'>
            <h3 className='experience-title'>{exp.title}</h3>
            <div className='experience-date'>{exp.duration}</div>
            <ul className='bullets experience-details'>
              {exp.duties.map((duty, j) => (
                <li key={j}>{duty}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
import './Experiences.css';

export default function Experiences() {
  const experiences = [
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
    {
      title: 'FIRST Robotics Competition Team [569]',
      duration: 'September 2022 - June 2024',
      duties: [
        'Programmed robot control systems in Java for autonomous and teleop tasks.',
        'Worked with CAN bus and electrical wiring to integrate subsystems.',
        'Collaborated with mechanical and electrical teams to deliver competition-ready robots.',
      ],
    },
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

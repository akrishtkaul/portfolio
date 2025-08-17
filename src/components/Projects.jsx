import './Projects.css';

export default function Projects() {
  const projects = [
    {
      title: 'EK131 Temp Monitor',
      blurb: 'Arduino-based room temperature sensor with LCD, buzzer, LEDs, and portable 9V power.',
      tags: ['Arduino', 'C++', 'Onshape']
    },
    {
      title: 'HTSwireHarness PCB',
      blurb: 'Custom PCB for Horizontal Test Stand; full schematic design to Gerber fabrication.',
      tags: ['Altium', 'Schematic Design']
    },
    {
      title: 'Rocket Nozzle (HIP Project)',
      blurb: 'Designed nozzle in SolidWorks and programmed Arduino for automated actuation; integrated with soldered wiring.',
      tags: ['SolidWorks', 'Arduino', 'Soldering']
    },
    {
      title: 'FRC Ivan 3.0',
      blurb: 'Java-controlled robot with CAN bus wiring; led programming team to school’s top finish in 15 years.',
      tags: ['Java', 'CAN-BUS Wiring']
    },
    {
      title: 'Personal Website',
      blurb: 'Portfolio site built from scratch with React, showcasing projects and experience.',
      tags: ['HTML/CSS', 'JavaScript', 'React']
    }
  ];

  return (
    <div className='section-container'>
      <div className='panel'>
        <h2>Projects</h2>

        <div className='project-grid'>
          {projects.map(p => (
            <div className='project-card' key={p.title}>
              <h3 className='project-title'>{p.title}</h3>
              <p className='project-blurb'>{p.blurb}</p>
              <div className='skill-list'>
                {p.tags.map(t => (
                  <span className='skill' key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

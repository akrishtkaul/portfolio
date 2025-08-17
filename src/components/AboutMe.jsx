import './AboutMe.css';
import SkillsList from './SkillsList';
import ProfilePicture from './ProfilePicture';
import TypeWriter from './TypeWriter';

import PythonIcon from '../assets/python_logo.png';
import JavaIcon from '../assets/java_icon.png';
import ReactIcon from '../assets/react.svg';
import JSIcon from '../assets/javascript_logo.png';
import CPLusPlus from '../assets/cpp_logo.png';
import AltiumIcon from '../assets/altium_logo.png';
import ArduinoIcon from '../assets/arduino_logo.png';

export default function AboutMe() {
  const softwareSkills = [
    { icon: PythonIcon, label: 'Python' },
    { icon: JavaIcon, label: 'Java' },
    { icon: ReactIcon, label: 'React' },
    { icon: JSIcon, label: 'JavaScript' },
    { icon: CPLusPlus, label: 'C++' },
  ];

  const hardwareSkills = [
    { icon: AltiumIcon, label: 'Altium' },
    { icon: ArduinoIcon, label: 'Arduino' },
  ];

  return (
    <div className='aboutme-container'>
      <ProfilePicture />

      <div className='akrisht-introduction'>
        <h2>Who is Akrisht?</h2>
        <TypeWriter />
        <br />

        <p className='aboutme-text'>
          Akrisht is a computer engineering student who turns ideas into working rockets, cars, and full stack apps. 
          He writes backend Java, builds clean web interfaces, and explores machine learning with Python. 
          On the hardware side he prototypes with Arduino and designs custom PCBs in Altium, then wires, tests, 
          and documents the systems. He also leads planning, fundraising, and execution so projects have the funds 
          and resources to succeed. 
        </p>

        <br />

        <p className='aboutme-text'>
          Other than being deep in code or sketching circuit diagrams, you’ll catch him making 
          music, breakdancing, or trying to perfect the next kickboxing combo.
        </p>
      </div>

      <div className='skills-container'>
        <h2>Skills</h2>

        <h3 className='skills-tag'>Software</h3>
        <SkillsList skills={softwareSkills} />
        <br />

        <h3 className='skills-tag'>Hardware</h3>
        <SkillsList skills={hardwareSkills} />
      </div>

      <div className='education-container'>
        <h2>Education</h2>

        <div className='school-info'> 
          <h3 className='college-name'>Columbia University</h3> 
          <p className='graduation-time'>September 2025 - May 2028</p>
          <p className='degree'>B.S. Computer Engineering</p>  
        </div>

        <div className='school-info'>
          <h3 className='college-name'>Boston University</h3>  
          <p className='graduation-time'>September 2024 - May 2025</p>
          <p className='degree'>B.S. Computer Engineering</p>        
          <p className='awards'>Dean&apos;s List</p> 
          <br />
          <p className='awards'>Distinguished Summer Research Fellow</p>
        </div>
      </div>
    </div>
  );
}

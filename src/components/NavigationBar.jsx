// NavigationBar.jsx
import './NavigationBar.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function NavigationBar() {

  return (
      <nav className="navigation-bar">
        <ul className="navigation-bar-options">
          <li className="bar-option">
            <a className="navbar-link" href="#">Akrisht Kaul</a>
          </li>
          <li className="bar-option">
            <a className="navbar-link" href="#about">About Me</a>
          </li>
          <li className="bar-option">
            <a className="navbar-link" href="#experience">Experiences</a>
          </li>
          <li className="bar-option">
            <a className="navbar-link" href="#projects">Projects</a>
          </li>
          <li className="bar-option">
            <a href='https://github.com/akrishtkaul' className='icon-link' target='_blank' rel='noopener noreferrer'><FaGithub/></a>
          </li>
          <li className="bar-option">
            <a href='https://www.linkedin.com/in/akrishtkaul' className='icon-link' target='_blank' rel='noopener noreferrer'><FaLinkedin/></a>
          </li>
          <li className="bar-option">
            <a href='mailto:akrishtkaul@gmail.com' className='icon-link'><FaEnvelope/></a>
          </li>
        </ul>
      </nav>
  );
}

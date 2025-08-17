import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='footer'>
      <p>© {new Date().getFullYear()} Akrisht Kaul · Built with React</p>
      <div className='footer-links'>
        <a
          href='https://github.com/akrishtkaul'
          className='icon'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'
        >
          <FaGithub />
        </a>
        <a
          href='https://www.linkedin.com/in/akrishtkaul'
          className='icon'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'
        >
          <FaLinkedin />
        </a>
        <a
          href='mailto:akrishtkaul@gmail.com'
          className='icon'
          aria-label='Email'
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}

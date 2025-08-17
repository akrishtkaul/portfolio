

export default function SkillsList(props){

  let skillsArray = props.skills;
  return(
  <ul className="skill-list">
        {skillsArray.map(s => (
          <li key={s.label} className="skill">
            <span className="skill-box" aria-hidden="true"><img className='skill-picture' src={s.icon}/></span>
            <p>{s.label}</p>
          </li>
        ))}
      </ul>
  );
  
}
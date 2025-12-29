export default function SkillsList({ skills }) {
  return (
    <>
      {skills.map((skill) => (
        <div
          key={skill.label}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 hover:bg-sky-400/10 hover:border-sky-400/30 transition-all duration-300 group"
        >
          {/* Icon */}
          <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
            <img
              src={skill.icon}
              alt={skill.label}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* Label */}
          <p className="text-white/70 text-xs sm:text-sm font-medium group-hover:text-sky-300 transition-colors whitespace-nowrap">
            {skill.label}
          </p>
        </div>
      ))}
    </>
  );
}
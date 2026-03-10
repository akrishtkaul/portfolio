export default function SkillsList({ skills }) {
  return (
    <>
      {skills.map((skill) => (
        <div
          key={skill.label}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E2E8F0] bg-[#EFF6FF] hover:bg-blue-100 transition-all duration-200 group"
        >
          <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
            <img src={skill.icon} alt={skill.label} className="w-full h-full object-contain" />
          </div>
          <p className="text-[#1D4ED8] text-[clamp(10px,2.6vw,12px)] sm:text-sm font-medium leading-tight whitespace-nowrap">
            {skill.label}
          </p>
        </div>
      ))}
    </>
  );
}
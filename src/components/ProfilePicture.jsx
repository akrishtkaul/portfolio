import AkrishtPicture from '../assets/akrisht_profile.jpg';

export default function ProfilePicture() {
  return (
    <div className="relative">
      {/* Subtle glow behind */}
      <div className="absolute -inset-1 rounded-3xl bg-sky-500/10 blur-2xl opacity-60" />
      
      {/* Card wrapper */}
      <div className="relative rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <img
          className="w-full aspect-square object-cover rounded-2xl"
          src={AkrishtPicture}
          alt="Akrisht Kaul"
        />
      </div>
    </div>
  );
}

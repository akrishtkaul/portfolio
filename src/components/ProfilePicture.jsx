import AkrishtPicture from '../assets/akrisht_profile.jpg';

export default function ProfilePicture() {
  return (
    <div className="relative">
      <div className="relative rounded-3xl border border-[#E2E8F0] bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <img className="w-full aspect-square object-cover rounded-2xl" src={AkrishtPicture} alt="Akrisht Kaul" />
      </div>
    </div>
  );
}

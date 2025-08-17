import './ProfilePicture.css';
import AkrishtPicture from '../assets/akrisht_profile.jpg'; // must exist here

export default function ProfilePicture() {
    
  return (
    <img
      className="profile-picture"
      src={AkrishtPicture}
    />
  );
}

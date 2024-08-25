import '../css/DL_Face.css';
import ProfPic from '../assets/profile_pic.jpg';
import Signature from '../assets/Signature.png';

export default function DL_Face() {
  return (
    <div className="driver-license">
      <div className="license-header">ABOUT ME!</div>
      <div className="license-body">
        <div className="license-photo">
          <img src={ProfPic} alt="Profile" className="profile-pic" />
          <img src={Signature} alt="Signature" className="signature" />
        </div>
        <div className="license-info">
          <div className="license-line"><strong>Name:</strong> Cody Z Garcia</div>
          <div className="license-line"><strong>Education:</strong> Electrical Engineering and Computer Science (UC Berkeley '26)</div>
          <div className="license-line"><strong>Pronouns:</strong> he/him/his</div>
          <div className="license-line"><strong>Ethnicity:</strong> Filipino-American</div>
          <div className="license-line"><strong>Hobbies:</strong> Basketball, Crochetting, League of Legends, Watching K-Dramas</div>
        </div>
      </div>
    </div>
  );
}
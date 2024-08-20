import React from 'react';
import './Contact_Card_Face.css';
import sendIcon from './assets/send_icon.webp'

const Contact_Card = () => {
  return (
    <div className="contact-card">
      <h2 className="contact-title">Contact Me!</h2>
      <form className="contact-form">
        <div className="left-section">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" id="name" className="form-input" placeholder="name..." />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea id="message" className="form-input" placeholder="message..."></textarea>
          </div>
        </div>
        <div className="right-section">
          <label className="form-label">Contact</label>
          <input type="email" className="contact-input" placeholder="Contact@email.com" />
          <span className="or-text">or</span>
          <input type="tel" className="contact-input" placeholder="(999) 999-9999" />
        </div>
      </form>
      <button type="submit" className="send-button">
        SEND
        <img src={sendIcon} alt="Send Icon" className="send-icon" />
      </button>
    </div>
  );
};

export default Contact_Card;


// import React from 'react';
// import './Contact_Card.css';

// const Contact_Card = () => {
//   return (
//     <div className="contact-card">
//       <h2 className="contact-title">Contact Me!</h2>
//       <form className="contact-form">
//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input type="text" id="name" className="form-input" placeholder="name..." />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message" className="form-label">Message</label>
//           <textarea id="message" className="form-input" placeholder="message..."></textarea>
//         </div>
//         <div className="contact-details">
//           <input type="email" className="contact-input" placeholder="contact@email.com" />
//           <span className="or-text">or</span>
//           <input type="tel" className="contact-input" placeholder="(999) 999-9999" />
//         </div>
//         <button type="submit" className="send-button">SEND</button>
//       </form>
//     </div>
//   );
// };

// export default Contact_Card;
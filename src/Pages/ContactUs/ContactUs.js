import React from "react";
import "./ContactUs.css";
import facebookLogo from "../../Components/Assets/facebook_logo.svg";
import instagramLogo from "../../Components/Assets/instagram_logo.svg";
import twiterLogo from "../../Components/Assets/twiter_logo.svg";

const ContactUs = () => {
  return (
    <div className="Contact-container">
      <div className="Conatct-Join-container">
        <div className="join-content">
          <h1>JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO</h1>
          <p>Type your email down below and be young wild generation</p>
          <div className="email-container">
            <input
              name="email"
              type="text"
              class="search-box"
              placeholder="&#767676;  Add your email here"
            />
            <button name="submit" class="" type="submit">
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-element">
          <div className="leftFooter">
            <h1>FASHION</h1>
            <p>Complete your style with awesome clothes from us.</p>
            <div className="socialMedia-container">
              <img src={facebookLogo} />
              <img src={instagramLogo} />
              <img src={twiterLogo} />
            </div>
          </div>
          <div className="rightFooter">
            <div className="first-container">
              <p>Company</p>
              <p>About</p>
              <p>Contact Us</p>
              <p>Support</p>
              <p>Careers</p>
            </div>
            <div className="second-container">
              <p>Quick Link</p>
              <p>Share Location</p>
              <p>Orders Tracking</p>
              <p>Size Guide</p>
              <p>FAQs</p>
            </div>
            <div className="third-container">
              <p>Legal</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

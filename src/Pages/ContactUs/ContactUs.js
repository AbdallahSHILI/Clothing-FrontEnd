import React from "react";
import "./ContactUs.css";
import facebookLogo from "../../Components/Assets/facebook_logo.svg";
import instagramLogo from "../../Components/Assets/instagram_logo.svg";
import twiterLogo from "../../Components/Assets/twiter_logo.svg";

const ContactUs = () => {
  return (
    <div className="Contact-container">
      <div className="ConatctUs_container">
        <div className="left_ContactUs">
          <h1>Contact us</h1>
          <div className="Inputs_container">
            <input
              name="userName"
              type="text"
              placeholder="Enter your name here"
            />
            <input
              name="email"
              type="text"
              placeholder="Enter your email here"
            />
          </div>
          <button name="submit" type="submit">
            SEND
          </button>
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

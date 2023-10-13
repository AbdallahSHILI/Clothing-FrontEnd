import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="Contact-container">
      <div className="ConatctJoin-container">
        <h1>JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO</h1>
        <p>Type your email down below and be young wild generation</p>
        <div className="email-container">
          <input type="text" required="required" />
          <span>Add your email here</span>
          <button type="submit" class="button">
            Send
          </button>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-element">
          <div className="leftFooter"></div>
          <div className="rightFooter"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

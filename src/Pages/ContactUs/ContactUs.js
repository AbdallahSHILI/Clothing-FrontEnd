import React, { useEffect, useState } from "react";
import "./ContactUs.css";
import Axios from "axios";
import Cookies from "js-cookie";
import validator from "validator";
import facebookLogo from "../../Components/Assets/facebook_logo.svg";
import instagramLogo from "../../Components/Assets/instagram_logo.svg";
import twiterLogo from "../../Components/Assets/twiter_logo.svg";
import GirlContactUs from "../../Components/Assets/contact-us-2-62fa2cc2edbaf-sej-removebg-preview.jpg";

const ContactUs = () => {
  const [FirstLastName, setFirstLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [WhatIsAbout, setWhatIsAbout] = useState("");
  const [Message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const API = "http://localhost:3001";

  useEffect(() => {
    // Check if the user is connected
    const token = Cookies.get("access-token");
    if (token) {
      setIsConnected(true);
      // Fetch user details from the backend
      Axios.get(`${API}/Clothing/Users/Me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const user = response.data.user;
          const firstLastName = user.FirstLastName;
          const email = user.Email;
          setFirstLastName(`${firstLastName}`);
          setEmail(email);
        })
        .catch((error) => {
          console.error("Failed to fetch user details", error);
          setIsConnected(false); // In case of an error, consider user as not connected
        });
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    const nameParts = FirstLastName.trim().split(" ");
    if (nameParts.length < 2) {
      errors.FirstLastName = "Please enter both first and last name!";
    }
    if (!validator.isEmail(Email)) {
      errors.Email = "Please enter a valid email!";
    }
    if (!WhatIsAbout) {
      errors.WhatIsAbout = "Please select an Option!";
    }
    if (Message.length < 2) {
      errors.Message = "Please enter A valid message !";
    }

    // Add other validations as needed

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors, false otherwise
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Stop the form submission if validation fails
    }
    try {
      const response = await Axios.post(`${API}/Clothing/Users/ContactUs`, {
        FirstLastName,
        Email,
        WhatIsAbout,
        Message,
      });
      console.log("Message Sent Succesfuly :", response.data);
      setContactMessage("Message Sent Successfully!");
      if (!isConnected) {
        setFirstLastName("");
        setEmail("");
      }
      setWhatIsAbout("");
      setMessage("");
      setTimeout(() => {
        setContactMessage("");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || "An unknown error occurred";
        setContactMessage(`Sending Message Failed: ${errorMessage}`);
      } else {
        setErrors({ backend: "Sent Message failed: " + error.message });
        setContactMessage("An error occurred while sending the message.");
      }
      setTimeout(() => {
        setContactMessage(""); // Clear message after 3 seconds
      }, 3000);
    }
  };

  return (
    <ContactUsForm
      FirstLastName={FirstLastName}
      setFirstLastName={setFirstLastName}
      Email={Email}
      setEmail={setEmail}
      WhatIsAbout={WhatIsAbout}
      setWhatIsAbout={setWhatIsAbout}
      Message={Message}
      setMessage={setMessage}
      onSubmit={onSubmit}
      isConnected={isConnected}
      setIsConnected={setIsConnected}
      contactMessage={contactMessage}
      setContactMessage={setContactMessage}
      errors={errors}
    />
  );
};

const ContactUsForm = ({
  FirstLastName,
  setFirstLastName,
  Email,
  setEmail,
  WhatIsAbout,
  setWhatIsAbout,
  Message,
  setMessage,
  onSubmit,
  isConnected,
  setIsConnected,
  contactMessage,
  setContactMessage,
  errors,
}) => {
  return (
    <div className="Contact-container">
      <div className="ConatctUs_container">
        <div className="left_ContactUs">
          <h1 className="title">Contact us</h1>
          <form className="ContactUs_Form" onSubmit={onSubmit}>
            <div className="Inputs_container">
              <input
                type="text"
                name="FirstLastName"
                id="FirstLastName"
                required="required"
                placeholder="Enter your first and last name here"
                value={FirstLastName}
                className={isConnected ? "readonly" : ""}
                onChange={(e) => setFirstLastName(e.target.value)}
                readOnly={isConnected} // Make read-only if user is connected
              />
              {errors.FirstLastName && (
                <p className="error">{errors.FirstLastName}</p>
              )}
              <input
                type="text"
                name="Email"
                id="Email"
                required="required"
                placeholder="Enter your email here"
                value={Email}
                className={isConnected ? "readonly" : ""}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isConnected}
              />
              {errors.Email && <p className="error">{errors.Email}</p>}
            </div>
            <h1>What is it about ?</h1>
            <div className="radio_inputs">
              <label>
                <input
                  type="radio"
                  id="Sales Enquiry"
                  name="Raison"
                  value="Sales Enquiry"
                  checked={WhatIsAbout === "Sales Enquiry"}
                  onChange={(e) => setWhatIsAbout(e.target.value)}
                />
                Sales Enquiry
              </label>
              <label>
                <input
                  type="radio"
                  id="Customer Feedback"
                  name="Raison"
                  value="Customer Feedback"
                  checked={WhatIsAbout === "Customer Feedback"}
                  onChange={(e) => setWhatIsAbout(e.target.value)}
                />
                Customer Feedback
              </label>
              <label>
                <input
                  type="radio"
                  id="Other"
                  name="Raison"
                  value="Other"
                  checked={WhatIsAbout === "Other"}
                  onChange={(e) => setWhatIsAbout(e.target.value)}
                />
                Other
              </label>
              {errors.WhatIsAbout && (
                <p className="error">{errors.WhatIsAbout}</p>
              )}
            </div>
            <br />
            <textarea
              name="Message"
              placeholder="Enter your message here"
              required="required"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.Message && <p className="error">{errors.Message}</p>}
            {errors.backend && <p className="error">{errors.backend}</p>}
            <button name="submit" type="submit">
              SEND
            </button>
            {contactMessage && (
              <div className={`Contact_Message ${contactMessage && "fadeIn"}`}>
                {contactMessage}
              </div>
            )}
          </form>
        </div>
        <div className="right_ContactUs">
          <img className="Girl_Logo" src={GirlContactUs} alt="Contact Us" />
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

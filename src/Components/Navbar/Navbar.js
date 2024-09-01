import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Vector.svg";
import Chariot from "../Assets/chariot.png";
import MessageIcon from "../Assets/message_icon.svg";
import Cookies from "js-cookie";
import { MessageContext } from "../../useContext/messageContext"; // Import the context

const Navbar = () => {
  const [role, setRole] = useState(Cookies.get("user-role"));
  const isAuthenticated = Cookies.get("access-token");
  const { messageCount } = useContext(MessageContext); // Destructure messageCount from context

  const handleLogout = () => {
    // Remove the access token cookie
    Cookies.remove("access-token");
    Cookies.remove("user-role");
    Cookies.remove("user-id");

    // Dispatch the "logout" event
    /*creating and sending a custom event named logout. 
Any component or part of your application that is 
set up to listen for this event can then respond to it.*/
    const event = new Event("logout"); //create a new logout event.
    window.dispatchEvent(event); //sends or "dispatches" this event to the window object, making it a global event.

    // Redirect the user to the login page (or any other desired page)
    window.location.href = "/login";
  };

  return (
    <nav className="header">
      <div className="logo-vector">
        <img src={logo} alt="Logo" />
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-element">
        <div className="navbar-control">
          {isAuthenticated && role === "admin" && (
            <Link to="/Dashboard">Dashboard</Link>
          )}
          {isAuthenticated && role !== "admin" && (
            <>
              <Link to="/Fashion">Fashion</Link>
              <Link to="/Favorite">Favorite</Link>
            </>
          )}
          {role !== "admin" && (
            <>
              {" "}
              <Link to="/ContactUs">Contact us</Link>
              <Link to="/AllClothes">Catalogue</Link>
            </>
          )}
        </div>
        {isAuthenticated && role == "admin" && (
          <Link to="/AllMessages">
            <div className="message-icon-wrapper">
              <img src={MessageIcon} alt="Message" className="message_icon" />
              {/* Display message count */}
              <span className="message-count">{messageCount}</span>
            </div>
          </Link>
        )}
        <div className="LoginSignup">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-button">
              <span></span> {/* Placeholder for the icon */}
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/Login">
              <button className="login-button">
                <span></span> {/* Placeholder for the icon */}
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

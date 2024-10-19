import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Vector.svg";
import Menu from "../Assets/Menu.svg";
import Chariot from "../Assets/chariot.png";
import MessageIcon from "../Assets/message_icon.svg";
import Cookies from "js-cookie";
import { MessageContext } from "../../useContext/messageContext"; // Import the context
import loginIcon from "../../Components/Assets/login.svg";

const Navbar = () => {
  const [role, setRole] = useState(Cookies.get("user-role"));
  const isAuthenticated = Cookies.get("access-token");
  const { messageCount } = useContext(MessageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="header">
      <div className="logo-vector">
        <img src={logo} alt="Logo" />
        <Link to="/">Home</Link>
      </div>
      <div className={`navbar-element ${isMenuOpen ? "open" : ""}`}>
        <div className="navbar-control">
          {isAuthenticated && role === "admin" && (
            <Link to="/Dashboard">Dashboard</Link>
          )}
          <Link to="/AllClothes">Catalogue</Link>
          {role !== "admin" && (
            <>
              <Link to="/ContactUs">Contact Us</Link>
            </>
          )}
          {isAuthenticated && role !== "admin" && (
            <>
              <Link to="/Favorite">Favorite</Link>
              <Link to="/AllBuyedClothes">
                <img src={Chariot} alt="Chariot" className="chariot" />
              </Link>
            </>
          )}
        </div>
        {isAuthenticated && role === "admin" && (
          <Link to="/AllMessages">
            <div className="message-icon-wrapper">
              <img src={MessageIcon} alt="Message" className="message_icon" />
              <span className="message-count">{messageCount}</span>
            </div>
          </Link>
        )}
        <div className="LoginSignup">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-button">
              <img src={loginIcon} className="login_icon" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/Login">
              <button className="login-button">
                <img src={loginIcon} className="login_icon" />
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
      <img src={Menu} className="menu_icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;

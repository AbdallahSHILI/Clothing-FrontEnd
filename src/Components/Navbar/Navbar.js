import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Vector.svg";
import Chariot from "../Assets/chariot.png";
import Cookies from "js-cookie";

const Navbar = () => {
  const isAuthenticated = Cookies.get("access-token");
  const role = Cookies.get("role");

  const handleLogout = () => {
    // Remove the access token cookie
    Cookies.remove("access-token");
    // Remove the role
    Cookies.remove("role");

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
          <Link to="/AllClothes">Catalogue</Link>
          {isAuthenticated && <Link to="/Fashion">Fashion</Link>}
          {isAuthenticated && <Link to="/Favorite">Favorite</Link>}
          <Link to="/ContactUs">Contact us</Link>
          {isAuthenticated && (
            <Link to="/AllBuyedClothes">
              <img src={Chariot} alt="Chariot" />
            </Link>
          )}
        </div>
        <div className="LoginSignup">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="Logout_button">
              Logout
            </button>
          ) : (
            <Link to="/Login">
              <button className="Login_button">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

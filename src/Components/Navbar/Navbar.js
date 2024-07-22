import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Vector.svg";
import Chariot from "../Assets/chariot.png";
import Cookies from "js-cookie";

const Navbar = () => {
  const isAuthenticated = Cookies.get("access-token");

  const handleLogout = () => {
    Cookies.remove("access-token");
    window.location.reload(); // Refresh the page to update the UI
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

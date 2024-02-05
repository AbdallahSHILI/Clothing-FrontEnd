import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Vector.svg";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="logo-vector">
        <img src={logo} />
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-element">
        <div className="navbar-control">
          <Link to="/Catalogue">Catalogue</Link>
          <Link to="/Clothes">Fashion</Link>
          <Link to="/Favorite">Favorite</Link>
          <Link to="/ContactUs">Contact us</Link>
        </div>
        <div className="LoginSinup">
          <Link to="/Login" className="Login-element">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

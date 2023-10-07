import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Vector.svg";
import { logDOM } from "@testing-library/react";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="logo-vector">
        <img src={logo} />
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-element">
        <div className="navbar-control">
          <Link to="/Clothes">Clothes</Link>
          <Link to="/Clothes">Clothes</Link>
          <Link to="/Clothes">Clothes</Link>
          <Link to="/Clothes">Clothes</Link>
        </div>
        <div className="LoginSinup">
          <Link to="/Login" className="Login-element">
            Login
          </Link>
        </div>
        {/* <Link to="/Register" className="Register-element">
          register
        </Link> */}
      </div>
    </nav>
    // <div className="header">
    //   <Link to="/" className="logo">
    //     Home
    //   </Link>
    //   <nav className="navbar">
    //     <Link to="/Clothes">Clothes</Link>
    //     <Link to="/Login">Login</Link>
    //     <Link to="/Register">register</Link>
    //   </nav>
    // </div>
  );
};

export default Navbar;

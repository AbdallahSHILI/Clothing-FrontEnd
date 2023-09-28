import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="mainNavbar">
      <Link to="/">Home</Link>
      <Link to="/Register">register</Link>
      <Link to="/Login">Login</Link>
      <Link to="/Clothes">Clothes</Link>
    </nav>
  );
};

export default Navbar;

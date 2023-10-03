import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        Home
      </Link>
      <nav className="navbar">
        <Link to="/Clothes">Clothes</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Register">register</Link>
      </nav>
    </div>
    // <nav className="mainNavbar">
    //   <div className="Logo-content">
    //     <Link to="/">Home</Link>
    //   </div>
    //   <div className="navElement">
    //     <ul>
    //       <li>
    //         <Link to="/Clothes">Clothes</Link>
    //       </li>
    //     </ul>
    //   </div>

    //   <div className="login-Register">
    //     <Link to="/Login">Login | </Link>
    //     <Link to="/Register">register</Link>
    //   </div>
    // </nav>
  );
};

export default Navbar;

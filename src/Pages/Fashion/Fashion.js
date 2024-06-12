import React from "react";
import "./Fashion.css";
import { Link } from "react-router-dom";

const Fashion = () => {
  return (
    <div className="theFashion">
      <p>
        New To Clothing? <Link to="/Register">Sign Up</Link>
      </p>
      <p>
        New Clothes<Link to="/Fashion/NewClothes">New Clothes</Link>
      </p>
      <p>
        All Clothes<Link to="/Fashion/AllClothes">All Clothes</Link>
      </p>
    </div>
  );
};

export default Fashion;

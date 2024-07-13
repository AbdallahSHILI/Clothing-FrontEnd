import React from "react";
import "./Fashion.css";
import { Link } from "react-router-dom";

const Fashion = () => {
  return (
    <div className="theFashion">
      <p>
        New Clothes<Link to="/NewClothes">New Clothes</Link>
      </p>
    </div>
  );
};

export default Fashion;

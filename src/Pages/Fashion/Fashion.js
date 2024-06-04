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
        <Link to="/Fashion/NewModel">NewModel</Link>
      </p>
    </div>
  );
};

export default Fashion;

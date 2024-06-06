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
        New Model<Link to="/Fashion/NewModel">NewModel</Link>
      </p>
      <p>
        All Models<Link to="/Fashion/AllModels">All Model</Link>
      </p>
    </div>
  );
};

export default Fashion;

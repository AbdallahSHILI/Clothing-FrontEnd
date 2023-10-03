import React from "react";
import "./SideBare.css";
import logo from "../../Components/Assets/My-Pic.jpg";

const SideBare = () => {
  return (
    <div className="theSideBare">
      <h1>picture of me</h1>
      <img src={logo} className="sideBare-picture" />
    </div>
  );
};

export default SideBare;

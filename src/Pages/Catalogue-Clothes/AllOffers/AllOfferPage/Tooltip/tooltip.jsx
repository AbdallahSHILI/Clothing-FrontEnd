// Tooltip.js
import React from "react";
import "./tooltip.css";

const Tooltip = ({ message, children }) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{message}</span>
  </div>
);

export default Tooltip;

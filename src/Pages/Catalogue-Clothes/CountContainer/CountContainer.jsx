import React from "react";
import "./CountContainer.css";

const CountContainer = (props) => {
  return <div className="count_container">{props.children}</div>;
};

export default CountContainer;

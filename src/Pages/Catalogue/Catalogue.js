import React from "react";
import "./Catalogue.css";
import logo1 from "../../Components/Assets/orange-girl.svg";
import logo2 from "../../Components/Assets/purple-girl.svg";
import logo3 from "../../Components/Assets/blue-girl.svg";
import logo4 from "../../Components/Assets/orange-girl.svg";
import logo5 from "../../Components/Assets/purple-girl.svg";
import logo6 from "../../Components/Assets/blue-girl.svg";

const Catalogue = () => {
  return (
    <div className="Catalogue-container">
      <img src={logo1} />
      <img src={logo2} />
      <img src={logo3} />
      <img src={logo4} />
      <img src={logo5} />
      <img src={logo6} />
    </div>
  );
};

export default Catalogue;

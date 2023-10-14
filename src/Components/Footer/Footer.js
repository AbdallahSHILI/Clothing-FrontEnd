import React from "react";
import "./Footer.css";
import HamAbid from "../../Components/Assets/HamadiAbid.svg";
import Obey from "../../Components/Assets/Obey_new.svg";
import Shopify from "../../Components/Assets/Shopify_new.svg";
import Lacoste from "../../Components/Assets/Lacoste_new.svg";
import Levis from "../../Components/Assets/Levis_new.svg";
import Amazon from "../../Components/Assets/Amazon_new.svg";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="fashionMark-container">
        <img src={HamAbid} />
        <img src={Obey} />
        <img src={Shopify} />
        <img src={Lacoste} />
        <img src={Levis} />
        <img src={Amazon} />
      </div>
    </div>
  );
};

export default Footer;

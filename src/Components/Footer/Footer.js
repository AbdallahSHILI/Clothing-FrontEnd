import React from "react";
import "./Footer.css";
import HamAbid from "../../Components/Assets/HamadiAbid.svg";
import Obey from "../../Components/Assets/OBEY.svg";
import Shopify from "../../Components/Assets/shopify-removebg-preview.jpg";
import Lacoste from "../../Components/Assets/1-removebg-preview.jpg";
import Levis from "../../Components/Assets/2-removebg-preview.jpg";
import Amazon from "../../Components/Assets/3-removebg-preview.jpg";

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

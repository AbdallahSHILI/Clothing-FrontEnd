import React from "react";
import "./Favorite.css";
import logo_1 from "../../Components/Assets/fav_1.svg";
import logo_2 from "../../Components/Assets/fav_2.svg";

export const Favorite = () => {
  return (
    <div className="mainContent">
      <img src={logo_1} className="post-image" />
      <img src={logo_2} className="post-image" />
    </div>
  );
};

export default Favorite;

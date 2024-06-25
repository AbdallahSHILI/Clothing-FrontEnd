import React from "react";
import "./Home.css";
import { Container } from "../../Components/Index";
import logo1 from "../../Components/Assets/beautiful-girl.png";
import logo2 from "../../Components/Assets/Vector-shop.svg";

const Home = () => {
  return (
    <Container>
      <div className="left-container">
        <div className="LEUC-container">
          <p>
            <span className="first-span">LET’S</span> EXPLORE{" "}
            <span className="second-span">UNIQUE</span> CLOTHES.
          </p>
        </div>
        <div className="life-container">
          <p>Live for Influential and Innovative fashion!</p>
        </div>
        <div className="shop-container">
          <img src={logo2} />
          <div className="shopNow-button">
            <p>Shop Now</p>
          </div>
        </div>
      </div>
      <img className="girlLogo" src={logo1} />

      {/* <div className="left-container">
        <div className="LEUC-container">
          <p>
            <span className="first-span">LET’S</span> EXPLORE
            <span className="second-span">UNIQUE</span> CLOTHES.
          </p>
        </div>
        <div className="life-container">
          <p>Live for Influential and Innovative fashion!</p>
        </div>
        <div className="shop-container">
          <img src={logo2} />
          <div className="shopNow-button">
            <p>Shop Now</p>
          </div>
        </div>
      </div>
      <img className="girlLogo" src={logo1} /> */}
    </Container>
  );
};

export default Home;

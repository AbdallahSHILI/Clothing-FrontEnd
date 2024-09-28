import React from "react";
import "./Home.css";
import { Container } from "../../Components/Index";
import logo1 from "../../Components/Assets/beautiful-girl.png";
import logo2 from "../../Components/Assets/Vector-shop.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <div className="left-container">
        <div className="LEUC-container">
          <p>
            <span className="first-span">LET’S</span> <br />
            <span>EXPLORE</span> <br />
            <span className="second-span">UNIQUE</span> <br />
            CLOTHES.
          </p>
        </div>
        <div className="life-container">
          <p>Live for Influential and Innovative fashion!</p>
        </div>
        <div className="shop-container">
          <img src={logo2} alt="Shop Icon" />
          <div className="shopNow-button">
            <Link to="AllClothes" style={{ textDecoration: "none" }}>
              <p>Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
      <img className="girlLogo" src={logo1} alt="Girl Logo" />
    </Container>
  );
};

export default Home;

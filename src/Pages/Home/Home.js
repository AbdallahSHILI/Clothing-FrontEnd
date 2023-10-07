import React from "react";
import "./Home.css";
import { Container } from "../../Components/Index";
import { Link } from "react-router-dom";
import logo from "../../Components/Assets/beautiful-girl.png";

const Home = () => {
  return (
    <Container>
      <div className="LEUC-container">
        <p>LET’S EXPLORE UNIQUE CLOTHES.</p>
        <div className="unique-container"></div>
        <div className="let's-container"></div>
      </div>
      <div className="paragraphe-container"></div>
      {/* <img src={logo} /> */}
      <div className="shop">
        <div className="shopNow-button"></div>
      </div>
      {/* <header class="join-header">
        <h1>Home Page</h1>
      </header>
      <main class="join-main">
        <form action="chat.html">
          <Link to="/Login">
            <button type="submit" class="btn">
              Login
            </button>
          </Link>
          <Link to="/Register">
            <button type="submit" class="btn">
              Register
            </button>
          </Link>
        </form>
      </main> */}
    </Container>
  );
};

export default Home;

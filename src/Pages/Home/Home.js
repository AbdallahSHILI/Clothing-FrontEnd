import React from "react";
import "./Home.css";
import { Container } from "../../Components/Index";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <header class="join-header">
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
      </main>
    </Container>
  );
};

export default Home;

import React from "react";
import "./Clothes.css";
import logo from "../../Components/Assets/My-Pic.jpg";

const Clothes = () => {
  return (
    <div className="mainContent">
      <section className="top-content">
        <header>
          <h2>
            <a href="#">My Clothes</a>
          </h2>
        </header>
        <footer>
          <section className="post-info"></section>
        </footer>
        <img src={logo} />
      </section>
    </div>
  );
};

export default Clothes;

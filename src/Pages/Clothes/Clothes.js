import React from "react";
import "./Clothes.css";
import logo from "../../Components/Assets/My-Pic.jpg";
import SideBare from "../SideBare/SideBare";

const Clothes = () => {
  return (
    <>
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
          <figure>
            <img src={logo} className="post-image" />
            <figcaption>THis is abdallah picture</figcaption>
          </figure>
        </section>
      </div>
      <SideBare />
      <SideBare />
      <SideBare />
    </>
  );
};

export default Clothes;

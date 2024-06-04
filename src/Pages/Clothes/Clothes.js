import React from "react";
import "./Clothes.css";
import logo from "../../Components/Assets/My-Pic.jpg";
import Fashion from "../Fashion/Fashion";

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

          <figure>
            <img src={logo} className="post-image" />
            <figcaption>THis is abdallah picture</figcaption>
          </figure>
        </section>
      </div>
      <footer>
        <section className="post-info"></section>
      </footer>
    </>
  );
};

export default Clothes;

import React, { useState, useEffect } from "react";
import "./AllClothes.css";
import Axios from "axios";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const AllClothes = () => {
  const [Clothes, setClothes] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        setClothes(response.data.doc);
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, []);

  return (
    <div className="models_container">
      {Clothes.map((clothes, index) => (
        <div key={index} className="model_card">
          <p>Description: {clothes.Description}</p>
          <p>
            Creation Date: {new Date(clothes.CreationDate).toLocaleDateString()}
          </p>
          {clothes.Image && (
            <img
              src={`${API}/images/${clothes.Image}`}
              alt={clothes.Description}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <FontAwesomeIcon icon={faHeart} className="heart_icon" />
        </div>
      ))}
    </div>
  );
};

export default AllClothes;

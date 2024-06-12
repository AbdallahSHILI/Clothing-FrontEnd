import React, { useState, useEffect } from "react";
import "./AllClothes.css";
import Axios from "axios";

const AllClothes = () => {
  const [Clothes, setClothes] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        console.log("API Response:", response.data);
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
              src={`${API}/${clothes.Image}`}
              alt={clothes.Description}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AllClothes;

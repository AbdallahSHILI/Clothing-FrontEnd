import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./OneClothes.css";

const OneClothes = () => {
  const { id } = useParams();
  const [clothes, setClothes] = useState(null);
  const API = "http://localhost:3001";

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/${id}`);
        setClothes(response.data.doc);
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, [id]);

  if (!clothes) {
    return <div className="loading">Loading...</div>; // Apply CSS class for loading state
  }

  return (
    <div className="one-clothes-container">
      <h2>{clothes.Description}</h2>
      {clothes.Image && (
        <img
          src={`${API}/images/${clothes.Image}`}
          alt={clothes.Description}
          className="clothes-image" // Apply CSS class for the image
        />
      )}
      <p>
        Creation Date: {new Date(clothes.CreationDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default OneClothes;

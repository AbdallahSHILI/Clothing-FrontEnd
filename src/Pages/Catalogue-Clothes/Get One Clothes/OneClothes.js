import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./OneClothes.css";
import { BackButton } from "../../../Components/Index";

const OneClothes = () => {
  const { id } = useParams();
  const [clothes, setClothes] = useState(null);
  const API = "http://localhost:3001";

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/${id}`);
        setClothes(response.data.clothes);
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, [id]);

  if (!clothes) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <BackButton />
      <div className="one-clothes-container">
        <h2>{clothes.Description}</h2>
        {clothes.Image && (
          <img
            src={`${API}/images/${clothes.Image}`}
            alt={clothes.Description}
            className="clothes-image"
          />
        )}
        <p>{new Date(clothes.Date).toLocaleDateString()}</p>
      </div>
    </>
  );
};

export default OneClothes;

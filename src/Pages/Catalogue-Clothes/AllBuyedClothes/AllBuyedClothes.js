import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import "./Favorite.css";
import DeleteClothes from "../Catalogue-Clothes/Delete Clothes/DeleteClothes";

export const AllBuyedClothes = () => {
  const [BuyedClothes, setBuyedClothes] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchBuyedClothes = async () => {
      try {
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllBuyClothes`
        );
        setBuyedClothes(response.data.clothes);
      } catch (error) {
        console.error("Fetching Bayed Clothes Failed", error);
      }
    };
    fetchBuyedClothes();
  }, []);

  const handleBuy = async (index, id, currentBuyingStatus) => {
    try {
      // Toggle favorite status
      const newBuyingStatus = !currentBuyingStatus;

      const response = await Axios.patch(
        `${API}/Clothing/Clothes/BuyOneClothes/${id}`,
        {
          Buyed: newBuyingStatus,
        }
      );

      // Update Buying status in the frontend
      // Creating a copy of the array
      // Create a new version of the state, modify it, and then update the state with this new version.
      const newClothes = [...Clothes];
      newClothes[index].Buyed = newBuyingStatus;
      setClothes(newClothes);
    } catch (error) {
      console.error("Buying Clothes Failed", error);
    }
  };

  return (
    <div className="mainContent">
      {BuyedClothes.map((buyedClothes) => (
        <div key={buyedClothes._id} className="model_card clicked">
          <div className="Header">
            <h1 className="description">{buyedClothes.Description}</h1>
          </div>
          <hr />
          {buyedClothes.Image && (
            <Link to={`/OneClothes/${buyedClothes._id}`}>
              <img
                src={`${API}/images/${buyedClothes.Image}`}
                alt={buyedClothes.Description}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Link>
          )}
          <div className="icon_container">
            <div className="icon">
              <DeleteClothes
                id={buyedClothes._id}
                onDelete={() => {
                  /* handleDelete should be defined if you want to handle deletes */
                }}
              />
            </div>
            <div className="icon">
              <Link to={`/OneClothes/${favClothes._id}`}>
                <Icon
                  name="browse"
                  tooltip="browse"
                  theme="light"
                  size="medium"
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBuyedClothes;

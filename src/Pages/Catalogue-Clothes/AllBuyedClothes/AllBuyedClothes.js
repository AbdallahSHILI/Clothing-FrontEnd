import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "react-crud-icons/dist/css/react-crud-icons.css";
import "./AllBuyedClothes.css";

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
      const newClothes = [...BuyedClothes];
      newClothes[index].Buyed = newBuyingStatus;
      setBuyedClothes(newClothes);

      // Remove the item from the list if it's been unbought
      if (!newBuyingStatus) {
        setBuyedClothes((prevClothes) =>
          prevClothes.filter((_, i) => i !== index)
        );
      }
    } catch (error) {
      console.error("Buying Clothes Failed", error);
    }
  };

  return (
    <div className="buy_models_container">
      {BuyedClothes.map((buyedClothes, index) => (
        <div key={buyedClothes._id} className="buy_model_card">
          <div className="buy_Header">
            <h1 className="buy_description">{buyedClothes.Description}</h1>
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
          <button
            onClick={() =>
              handleBuy(index, buyedClothes._id, buyedClothes.Buyed)
            }
            className="buy_Buy_Button"
          >
            Unbuy
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllBuyedClothes;

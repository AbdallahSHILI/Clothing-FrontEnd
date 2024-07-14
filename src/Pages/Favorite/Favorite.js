import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import "./Favorite.css";
import DeleteClothes from "../Catalogue-Clothes/Delete Clothes/DeleteClothes";

export const Favorite = () => {
  const [FavClothes, setFavClothes] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchFavClothes = async () => {
      try {
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllFavClothes`
        );
        setFavClothes(response.data.clothes);
      } catch (error) {
        console.error("Fetching Favorite Clothes Failed", error);
      }
    };
    fetchFavClothes();
  }, []);

  // Function to handle heart click (un-favorite)
  const handleHeartClick = async (id) => {
    try {
      await Axios.patch(`${API}/Clothing/Clothes/${id}`, { Favorite: false });
      // Remove the item from the state
      setFavClothes((prevFavClothes) =>
        prevFavClothes.filter((clothes) => clothes._id !== id)
      );
    } catch (error) {
      console.error("Updating Favorite status Failed", error);
    }
  };

  return (
    <div className="mainContent">
      {FavClothes.map((favClothes) => (
        <div key={favClothes._id} className="model_card clicked">
          <div className="Header">
            <h1 className="description">{favClothes.Description}</h1>
            <div className="heart">
              <Heart
                isClick={true}
                onClick={() => handleHeartClick(favClothes._id)}
              />
            </div>
          </div>
          <hr />
          {favClothes.Image && (
            <Link to={`/OneClothes/${favClothes._id}`}>
              <img
                src={`${API}/images/${favClothes.Image}`}
                alt={favClothes.Description}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Link>
          )}
          <div className="icon_container">
            <div className="icon">
              <DeleteClothes
                id={favClothes._id}
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

export default Favorite;

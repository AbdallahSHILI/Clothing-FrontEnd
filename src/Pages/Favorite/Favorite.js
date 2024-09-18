import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import "./Favorite.css";
import Cookies from "js-cookie";
import EmptyCartIcon from "../../Components/Assets/empty cart icon.svg";

export const Favorite = () => {
  const [FavClothes, setFavClothes] = useState([]);
  const [role, setRole] = useState(Cookies.get("user-role"));
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchFavClothes = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllFavClothes`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
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
      const token = Cookies.get("access-token");

      // Make the request to update the favorite status
      const response = await Axios.patch(
        `${API}/Clothing/Clothes/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the item from the state if it was unfavorited
      if (!response.data.favoriteStatus) {
        setFavClothes((prevClothes) =>
          prevClothes.filter((clothes) => clothes._id !== id)
        );
      }
    } catch (error) {
      console.error("Updating Favorite status Failed", error);
    }
  };

  return (
    <div className="mainContent">
      {FavClothes.length === 0 ? (
        // Show empty cart icon or message when there are no favorite clothes
        <div className="empty-message">
          <img src={EmptyCartIcon} alt="No products available" />
          <p>There is no available Clothes yet. Please favorite one of them.</p>
        </div>
      ) : (
        FavClothes.map((favClothes) => (
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
        ))
      )}
    </div>
  );
};

export default Favorite;

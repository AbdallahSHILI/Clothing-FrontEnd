import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./AllClothes.css";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import DeleteClothes from "../Delete Clothes/DeleteClothes";

const AllClothes = () => {
  const [Clothes, setClothes] = useState([]);
  const [clickedHearts, setClickedHearts] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        setClothes(response.data.doc);
        // Initialize clickedHearts state with false for each clothing item
        //Create a new array of length 3 (since there are 3 clothing items).
        // Fill this array with false values, indicating that none of the hearts are clicked initially.
        setClickedHearts(new Array(response.data.doc.length).fill(false));
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, []);

  const handleHeartClick = async (index, id, currentFavorite) => {
    try {
      // Toggle favorite status
      const newFavoriteStatus = !currentFavorite;

      // Update favorite status in the backend
      const response = await Axios.patch(`${API}/Clothing/Clothes/${id}`, {
        Favorite: newFavoriteStatus,
      });

      // Update favorite status in the frontend
      // Creating a copy of the array
      // Create a new version of the state, modify it, and then update the state with this new version.
      const newClothes = [...Clothes];
      newClothes[index].Favorite = newFavoriteStatus;
      setClothes(newClothes);
    } catch (error) {
      console.error("Updating Favorite status Failed", error);
    }
  };

  const handleDelete = (id) => {
    console.log("Clothes", Clothes);
    // Remove the clothing item from the state after it has been deleted
    setClothes((prevClothes) =>
      prevClothes.filter((clothes) => clothes._id !== id)
    );
    console.log("Clothes", Clothes);
  };

  return (
    <div className="models_container">
      {Clothes.map((clothes, index) => {
        let cardClass = "model_card";
        if (clothes.Favorite) {
          cardClass += " clicked";
        }
        return (
          <div key={clothes._id} className={cardClass}>
            <div className="Header">
              <h1 className="description">{clothes.Description}</h1>
              <div className="heart">
                <Heart
                  isClick={clothes.Favorite}
                  onClick={() =>
                    handleHeartClick(index, clothes._id, clothes.Favorite)
                  }
                />
              </div>
            </div>
            <hr />
            {clothes.Image && (
              <Link to={`/OneClothes/${clothes._id}`}>
                <img
                  src={`${API}/images/${clothes.Image}`}
                  alt={clothes.Description}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Link>
            )}
            <div className="icon_container">
              <div className="icon">
                <DeleteClothes id={clothes._id} onDelete={handleDelete} />
              </div>
              <div className="icon">
                <Link to={`/OneClothes/${clothes._id}`}>
                  <Icon
                    name="browse"
                    tooltip="browse"
                    theme="light"
                    size="medium"
                    // onClick={() => openModal(clothes)}
                  />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllClothes;

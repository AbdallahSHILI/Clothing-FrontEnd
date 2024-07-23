import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./AllClothes.css";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import DeleteClothes from "../Delete Clothes/DeleteClothes";
import Cookies from "js-cookie";

const AllClothes = () => {
  const isAuthenticated = Cookies.get("access-token");
  const [Clothes, setClothes] = useState([]);
  const API = "http://localhost:3001";
  console.log("000000:", Clothes);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        setClothes(response.data.doc);
        console.log("111111:", Clothes);
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, [isAuthenticated]);
  console.log("333333:", Clothes);
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
    // Remove the clothing item from the state after it has been deleted
    setClothes((prevClothes) =>
      prevClothes.filter((clothes) => clothes._id !== id)
    );
  };

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

  useEffect(() => {
    // Define the logout handler function
    const handleLogout = () => {
      // Remove the access token cookie
      Cookies.remove("access-token");

      // Reset the favorite status of all clothes to false
      setClothes((prevClothes) =>
        prevClothes.map((clothes) => ({
          ...clothes,
          Favorite: false,
        }))
      );
      console.log("4444444", Clothes);
      /* Reload the page to reflect changes in the UI.
    This reloads the page to reflect the changes immediately
     in the UI.*/
      window.location.reload();
    };

    /* Add the logout event listener when the component mounts
  This line adds an event listener to the window object. 
  The handleLogout function will be called whenever the "logout" event 
  is dispatched.*/
    window.addEventListener("logout", handleLogout);

    /* Cleanup function to remove the event listener when the component unmounts
  The return function is the cleanup function. It removes the "logout" event listener
   when the component unmounts to prevent memory leaks.*/
    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <>
      <div className="newClothes_header">
        <Link to={`/NewClothes`}>
          <Icon
            name="add"
            tooltip="add"
            theme="light"
            size="medium"
            // onClick={() => openModal(clothes)}
          />
          <h1>Add New Clothes</h1>
        </Link>
      </div>

      <div className="models_container">
        {Clothes.map((clothes, index) => {
          let cardClass = "model_card";
          if (clothes.Favorite) {
            cardClass += " clicked";
          }

          let buttonClass = "Buy_Button";
          if (clothes.Buyed) {
            buttonClass += " buyed";
          }
          let buttonText = "";
          if (clothes.Buyed) {
            buttonText = "Unbuy";
          } else {
            buttonText = "Buy";
          }

          return (
            <div key={clothes._id} className={cardClass}>
              <div className="Header">
                <h1 className="description">{clothes.Description}</h1>
                {isAuthenticated && (
                  <div className="heart">
                    <Heart
                      isClick={clothes.Favorite}
                      onClick={() =>
                        handleHeartClick(index, clothes._id, clothes.Favorite)
                      }
                    />
                  </div>
                )}
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
              {isAuthenticated && (
                <div className="icon_container">
                  <div className="icon">
                    <DeleteClothes id={clothes._id} onDelete={handleDelete} />
                  </div>
                  <button
                    onClick={() => handleBuy(index, clothes._id, clothes.Buyed)}
                    className={buttonClass}
                  >
                    {buttonText}
                  </button>
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
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllClothes;

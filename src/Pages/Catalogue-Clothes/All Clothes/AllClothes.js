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
import { BackButton } from "../../../Components/Index";
import CountContainer from "../CountContainer/CountContainer";
import Modal from "../../../Components/PopUp/BuyPopUp/BuyPopUp";

const AllClothes = () => {
  const isAuthenticated = Cookies.get("access-token");
  const [role, setRole] = useState(Cookies.get("user-role"));
  const [showPopUp, setShowPopUp] = useState(false);
  const [Clothes, setClothes] = useState([]);
  const [countClothes, setCountClothes] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState(null);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(`${API}/Clothing/Clothes/AllClothes`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userId = Cookies.get("user-id");
        setCountClothes(response.data.result);

        // Ensure userWhoSentOffer is always an array
        const updatedClothes = response.data.clothes.map((clothes) => ({
          ...clothes,
          isFavorite: clothes.FavoriteUsers.includes(userId),
          userWhoSentOffer: clothes.userWhoSentOffer || [], // Default to empty array if undefined
        }));

        setClothes(updatedClothes);
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, []);

  const handleHeartClick = async (index, id) => {
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

      // Update favorite status in the frontend based on the backend response
      const newClothes = [...Clothes];
      // Assuming response.data.favoriteStatus is true if added to favorites, false if removed
      if (response.data.favoriteStatus) {
        newClothes[index].isFavorite = true; // Custom property in frontend only
      } else {
        newClothes[index].isFavorite = false;
      }

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

  const handleBuy = (clothes) => {
    setSelectedClothes(clothes);
    setShowPopUp(true);
  };

  const handleModalClose = () => {
    setShowPopUp(false);
    setSelectedClothes(null);
  };

  useEffect(() => {
    // Define the logout handler function
    const handleLogout = () => {
      // Remove the access token cookie
      Cookies.remove("access-token");

      // Reset the favorite status of all clothes to false
      setClothes((prevClothes) => {
        const updatedClothes = prevClothes.map((clothes) => ({
          ...clothes,
          isFavorite: false,
        }));

        return updatedClothes;
      });

      // Optionally redirect the user to the login page
      window.location.href = "/login";
    };

    // Add the logout event listener when the component mounts
    window.addEventListener("logout", handleLogout);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, []);
  return (
    <>
      <BackButton />
      {isAuthenticated && role === "admin" && (
        <CountContainer>{countClothes} Clothes</CountContainer>
      )}
      {isAuthenticated && role === "admin" && (
        <div className="newClothes_header">
          <Link to={`/NewClothes`} style={{ textDecoration: "none" }}>
            <Icon name="add" tooltip="add" theme="light" size="medium" />
            <h1>Add New Clothes</h1>
          </Link>
        </div>
      )}

      <div className="models_container">
        {Clothes.map((clothes, index) => {
          let cardClass = "model_card";
          if (clothes.isFavorite) {
            cardClass += " clicked";
          }

          // Default button class and text
          let buttonClass = "Buy_Button";
          let buttonText = "Buy";

          // Check if current user is in the userWhoSentOffer array
          const userId = Cookies.get("user-id");
          const hasOffer = clothes.userWhoSentOffer.some(
            (offer) => offer._id.toString() === userId
          );

          if (hasOffer) {
            buttonClass += " Offre";
            buttonText = "Unbuy";
          }

          return (
            <div key={clothes._id} className={cardClass}>
              {/* Other components and elements */}
              {isAuthenticated && role === "customer" && (
                <button
                  onClick={() => handleBuy(clothes)}
                  className={buttonClass}
                >
                  {buttonText}
                </button>
              )}
              {/* Other components and elements */}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={showPopUp}
        onClose={handleModalClose}
        clothesId={selectedClothes ? selectedClothes._id : null}
      />
    </>
  );
};

export default AllClothes;

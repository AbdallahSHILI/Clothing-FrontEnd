import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./AllClothes.css";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import Cookies from "js-cookie";
import EmptyCartIcon from "../../../Components/Assets/empty cart icon.svg";
import OfferIcon from "../../../Components/Assets/offer_icon.png";
import { BackButton } from "../../../Components/Index";
import CountContainer from "../CountContainer/CountContainer";
import BuyModal from "../../../Components/PopUp/BuyPopUp/BuyPopUp";
import DeleteClothesModal from "../../../Components/PopUp/DeleteClothesPopUp/DeleteClothes";

const AllClothes = () => {
  const isAuthenticated = Cookies.get("access-token");
  const [role, setRole] = useState(Cookies.get("user-role"));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [Clothes, setClothes] = useState([]);
  const [countClothes, setCountClothes] = useState("0");
  const [selectedClothes, setSelectedClothes] = useState(null); // For both Buy and Delete
  const [userSendOffre, setUserSendOffre] = useState(null);
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
        setCountClothes(response.data.result);

        const userId = Cookies.get("user-id");

        // Iterate over the clothes to check if the user has sent an offer for any item
        const updatedClothes = response.data.clothes.map((clothes) => {
          const isInList = clothes.userWhoSentOffer?.includes(userId);
          return {
            ...clothes,
            isFavorite: clothes.FavoriteUsers.includes(userId),
            userSendOffre: isInList, // Set a flag for the current item
          };
        });

        /*.some() checks if at least one element in the array satisfies a given condition. 
        It returns true if any item in the array matches the condition and false otherwise.*/
        const hasUserSentOffer = updatedClothes.some(
          (clothes) => clothes.userSendOffre
        );
        setUserSendOffre(hasUserSentOffer);
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

  // const handleDelete = (id) => {
  //   // Remove the clothing item from the state after it has been deleted
  //   setClothes((prevClothes) =>
  //     prevClothes.filter((clothes) => clothes._id !== id)
  //   );
  // };

  const handleBuy = (clothes) => {
    setSelectedClothes(clothes);
    setShowPopUp(true);
  };

  const handleDelete = (clothes) => {
    setSelectedClothes(clothes); // Set the selected item to be deleted
    setShowDeleteModal(true); // Open the delete modal
  };

  const handleDeleteSuccess = (clothesId) => {
    // Remove the clothing item from the state after it has been deleted
    setClothes((prevClothes) => {
      const updatedClothes = prevClothes.filter(
        (clothes) => clothes._id !== clothesId
      );
      setCountClothes(updatedClothes.length); // Update the count dynamically
      return updatedClothes;
    });
  };

  const handleModalClose = () => {
    setShowPopUp(false);
    setShowDeleteModal(false); // Close the delete modal
    setSelectedClothes(null);
  };

  const handleOfferSent = (clothesId) => {
    const updatedClothes = Clothes.map((clothes) => {
      if (clothes._id === clothesId) {
        return { ...clothes, userSendOffre: true };
      }
      return clothes;
    });

    setClothes(updatedClothes);
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
        {Clothes.length === 0 ? (
          isAuthenticated && role === "admin" ? (
            <div className="empty_message">
              <img src={EmptyCartIcon} alt="No products available" />
              <p>
                No clothes available yet. Please add some clothes to the
                collection.
              </p>
            </div>
          ) : (
            <div className="empty_message">
              <img src={EmptyCartIcon} alt="No products available" />
              <p>No clothes available yet.</p>
            </div>
          )
        ) : (
          Clothes.map((clothes, index) => {
            let cardClass = "model_card";
            if (clothes.isFavorite) cardClass += " clicked";

            return (
              <div key={clothes._id} className={cardClass}>
                <img src={OfferIcon} alt="Offers" />
                <div className="Header">
                  <h1 className="description">{clothes.Description}</h1>
                  {isAuthenticated && role === "customer" && (
                    <div className="heart">
                      <Heart
                        isClick={clothes.isFavorite}
                        onClick={() => handleHeartClick(index, clothes._id)}
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
                <div className="icon_container">
                  {role === "admin" && (
                    <div className="icon">
                      <Icon
                        onClick={() => handleDelete(clothes)}
                        name="delete"
                        tooltip="delete"
                        theme="light"
                        size="medium"
                      />
                    </div>
                  )}
                  {role === "customer" && (
                    <button
                      onClick={() => handleBuy(clothes)}
                      className={
                        clothes.userSendOffre
                          ? "OffreSent_Button"
                          : "Buy_Button"
                      }
                      disabled={clothes.userSendOffre}
                    >
                      {clothes.userSendOffre ? "Offre Sent" : "Buy"}
                    </button>
                  )}
                  <div className="icon">
                    <Link to={`/OneClothes/${clothes._id}`}>
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
            );
          })
        )}
      </div>

      <BuyModal
        isOpen={showPopUp}
        onClose={handleModalClose}
        clothesId={selectedClothes ? selectedClothes._id : null}
        onOfferSent={handleOfferSent}
      />

      <DeleteClothesModal
        isOpen={showDeleteModal}
        onClose={handleModalClose}
        clothesId={selectedClothes ? selectedClothes._id : null}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </>
  );
};

export default AllClothes;

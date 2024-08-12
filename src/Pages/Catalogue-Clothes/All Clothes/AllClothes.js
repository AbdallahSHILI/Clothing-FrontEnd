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
  const [role, setRole] = useState(Cookies.get("user-role"));
  const [Clothes, setClothes] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        const userId = Cookies.get("user-id");

        /*The isFavorite status is lost when you navigate between pages,
         and you want to maintain this status.
         or each clothing item, we are adding a new property called isFavorite 
         to determine if the current user has favorited that item.
         { ...clothes }: This is using the spread operator (...), 
          It takes all the existing properties of the clothes object 
          and copies them into a new object.
          isFavorite: clothes.FavoriteUsers.includes(userId):
This adds a new property isFavorite to the object.
*/
        const updatedClothes = response.data.doc.map((clothes) => ({
          ...clothes,
          isFavorite: clothes.FavoriteUsers.includes(userId),
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
      setClothes((prevClothes) => {
        const updatedClothes = prevClothes.map((clothes) => ({
          ...clothes,
          Favorite: false,
        }));

        // Perform the page reload after the state update is completed
        setTimeout(() => {
          window.location.reload();
        }, 100);

        return updatedClothes;
      });
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
      {isAuthenticated && role === "admin" && (
        <div className="newClothes_header">
          <Link to={`/NewClothes`} style={{ textDecoration: "none" }}>
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
      )}

      <div className="models_container">
        {Clothes.map((clothes, index) => {
          let cardClass = "model_card";
          if (clothes.isFavorite) {
            // Check the frontend state property
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
              {isAuthenticated && (
                <div className="icon_container">
                  {role === "admin" && (
                    <div className="icon">
                      <DeleteClothes id={clothes._id} onDelete={handleDelete} />
                    </div>
                  )}
                  {role === "customer" && (
                    <button
                      onClick={() =>
                        handleBuy(index, clothes._id, clothes.Buyed)
                      }
                      className={buttonClass}
                    >
                      {buttonText}
                    </button>
                  )}

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

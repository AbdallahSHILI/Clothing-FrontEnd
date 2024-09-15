import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Cookies from "js-cookie";
import "./AllBuyedClothes.css";

export const AllBuyedClothes = () => {
  const [offers, setOffers] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllBuyClothes`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response");
        console.log(response);
        setOffers(response.data.offers);
      } catch (error) {
        console.error("Fetching offers Failed", error);
      }
    };
    fetchOffers();
  }, []);

  // const handleBuy = async (index, id, currentBuyingStatus) => {
  //   try {
  //     // Toggle favorite status
  //     const newBuyingStatus = !currentBuyingStatus;

  //     const response = await Axios.patch(
  //       `${API}/Clothing/Clothes/BuyOneClothes/${id}`,
  //       {
  //         Buyed: newBuyingStatus,
  //       }
  //     );

  //     // Update Buying status in the frontend
  //     // Creating a copy of the array
  //     // Create a new version of the state, modify it, and then update the state with this new version.
  //     const newClothes = [...BuyedClothes];
  //     newClothes[index].Buyed = newBuyingStatus;
  //     setBuyedClothes(newClothes);

  //     // Remove the item from the list if it's been unbought
  //     if (!newBuyingStatus) {
  //       setBuyedClothes((prevClothes) =>
  //         prevClothes.filter((_, i) => i !== index)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Buying Clothes Failed", error);
  //   }
  // };

  return (
    <div className="offers_container">
      {offers.map((offer, index) => (
        <div key={offer._id} className="offer_card">
          <div className="offer_header">
            <p className="offer_date">
              {new Date(offer.Date).toLocaleDateString()}
            </p>
            <p className="offer_price">${offer.Price}</p>
          </div>
          <div className="offer_body">
            <p className="offer_message">{offer.Message}</p>

            <div className="offer_image_container">
              <img
                src={`${API}/images/${offer.Image || "default.jpg"}`} // Replace 'default.jpg' if needed
                alt="Related clothes"
                className="offer_image"
              />
            </div>
          </div>
          <div className="offer_footer">
            <button
              onClick={() => handleChangeOffer(index, offer._id)}
              className="offer_button change_offer_button"
            >
              Change Offer
            </button>
            <button
              onClick={() => handleCancelOffer(index, offer._id)}
              className="offer_button cancel_offer_button"
            >
              Cancel Offer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBuyedClothes;

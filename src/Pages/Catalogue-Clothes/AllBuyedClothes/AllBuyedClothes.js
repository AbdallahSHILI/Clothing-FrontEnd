import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Cookies from "js-cookie";
import "./AllBuyedClothes.css";
import ModalOfferChange from "../../../Components/PopUp/ChangeOffer/changeOffer";

export const AllBuyedClothes = () => {
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
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
        setOffers(response.data.offers);
      } catch (error) {
        console.error("Fetching offers Failed", error);
      }
    };
    fetchOffers();
  }, []);

  // Function to open the modal and set the offer ID
  const handleChangeOffer = (offerId) => {
    setSelectedOfferId(offerId);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOfferId(null);
  };

  // Function to update the offer when it changes
  const handleOfferChange = (offerId, updatedPrice, updatedMessage) => {
    const updatedOffers = offers.map((offer) =>
      offer._id === offerId
        ? { ...offer, Price: updatedPrice, Message: updatedMessage }
        : offer
    );
    setOffers(updatedOffers);
  };

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
              onClick={() => handleChangeOffer(offer._id)} // Call to open the modal with the correct offer ID
              className="offer_button change_offer_button"
            >
              Change Offer
            </button>
            <button
              onClick={() => handleCancelOffer(offer._id)}
              className="offer_button cancel_offer_button"
            >
              Cancel Offer
            </button>
          </div>
        </div>
      ))}

      {/* Modal component */}
      <ModalOfferChange
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        offerId={selectedOfferId}
        onOfferChange={handleOfferChange}
      />
    </div>
  );
};

export default AllBuyedClothes;

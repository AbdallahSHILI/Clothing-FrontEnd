import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import "./allOffers.css";
import { BackButton } from "../../../../Components/Index";

const AllOffers = () => {
  const [offers, setOffers] = useState([]);
  const { idClothes } = useParams(); // Extract idClothes from URL
  const API = "http://localhost:3001";

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllOffers/${idClothes}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setOffers(response.data.offers);
      } catch (error) {
        console.error("Fetching offers failed", error);
      }
    };

    if (idClothes) {
      fetchOffers();
    }
  }, [idClothes]);

  return (
    <>
      <BackButton />
      {offers.length > 0 ? (
        offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <div className="offer-price">${offer.Price}</div>
            <div className="offer-details">
              <p className="user-name">{offer.FirstLastName}</p>
              <p className="user-email">{offer.Email}</p>
            </div>
            <div className="offer-actions">
              <button className="accept-btn">Accept Offer</button>
              <button className="refuse-btn">Refuse Offer</button>
            </div>
          </div>
        ))
      ) : (
        <p>No offers available.</p>
      )}
    </>
  );
};

export default AllOffers;

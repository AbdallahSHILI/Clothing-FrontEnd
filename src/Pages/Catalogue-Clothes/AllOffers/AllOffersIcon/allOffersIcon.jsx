// AllOffersIcon.jsx
import React, { useState, useEffect } from "react";
import OfferIcon from "../../../../Components/Assets/offer_icon.png";
import Cookies from "js-cookie";
import Axios from "axios";
import "./allOffersIcon.css";
import { Link } from "react-router-dom";

const AllOffersIcon = ({ idClothes, totalOffers }) => {
  const isAuthenticated = Cookies.get("access-token");
  const [role, setRole] = useState(Cookies.get("user-role"));
  const [offerCount, setOfferCount] = useState(totalOffers); // Use totalOffers from props
  const API = "http://localhost:3001";

  // Fetch offer count only if totalOffers is not passed as a prop
  useEffect(() => {
    const fetchOfferCount = async () => {
      try {
        const token = Cookies.get("access-token");
        if (token) {
          const response = await Axios.get(
            `${API}/Clothing/Clothes/AllOffers/${idClothes}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setOfferCount(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch offers", error);
      }
    };

    // Fetch only if totalOffers is not passed
    if (idClothes && totalOffers === undefined) {
      fetchOfferCount();
    }
  }, [idClothes, totalOffers]);

  // Disable the icon if there are no offers
  const isDisabled = offerCount === 0;

  return (
    <>
      {isAuthenticated && role === "admin" && (
        <div className={`offer-icon-wrapper ${isDisabled ? "disabled" : ""}`}>
          <Link
            to={`/AllOffers/${idClothes}`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <img
              src={OfferIcon}
              alt="Offers"
              className={`offer-icon ${
                isDisabled ? "offer-icon-disabled" : ""
              }`}
            />
          </Link>
          <span className="offer-count">{offerCount}</span>
        </div>
      )}
    </>
  );
};

export default AllOffersIcon;

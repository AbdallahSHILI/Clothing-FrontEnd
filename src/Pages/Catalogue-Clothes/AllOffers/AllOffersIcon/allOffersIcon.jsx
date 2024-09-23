import React, { useState, useEffect } from "react";
import OfferIcon from "../../../../Components/Assets/offer_icon.png";
import Cookies from "js-cookie";
import Axios from "axios";
import "./allOffersIcon.css";
import { Link } from "react-router-dom";

const AllOffersIcon = ({ idClothes }) => {
  const isAuthenticated = Cookies.get("access-token");
  const [role, setRole] = useState(Cookies.get("user-role"));
  const [offerCount, setOfferCount] = useState(0);
  const API = "http://localhost:3001";

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

    if (idClothes) {
      fetchOfferCount();
    }
  }, [idClothes]);

  return (
    <>
      {isAuthenticated && role === "admin" && (
        <div className="offer-icon-wrapper">
          {offerCount > 0 ? (
            <Link to={`/AllOffers/${idClothes}`}>
              <img src={OfferIcon} alt="Offers" className="offer-icon" />
            </Link>
          ) : (
            <img
              src={OfferIcon}
              alt="No Offers"
              className="offer-icon inactive"
            />
          )}
          <span className="offer-count">
            {offerCount > 0 ? offerCount : "0"}
          </span>
        </div>
      )}
    </>
  );
};

export default AllOffersIcon;

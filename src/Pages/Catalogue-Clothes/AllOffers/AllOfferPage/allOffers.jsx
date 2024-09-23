import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import Icon from "react-crud-icons";
import "./allOffers.css";
import { BackButton } from "../../../../Components/Index";
import Tooltip from "./Tooltip/tooltip";
import OfferIcon from "../../../../Components/Assets/offer_icon.png";

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
        setOffers(
          response.data.offers.sort((a, b) => b.Price - a.Price) // Sort offers by highest price first
        );
      } catch (error) {
        console.error("Fetching offers failed", error);
      }
    };

    if (idClothes) {
      fetchOffers();
    }
  }, [idClothes]);

  // Array of colors based on your input
  const colors = ["#772E25", "#C44536", "#EDDDD4", "#197278", "#283D3B"];

  // Function to interpolate between two colors
  const interpolateColor = (color1, color2, factor) => {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 0xff,
      g1 = (c1 >> 8) & 0xff,
      b1 = c1 & 0xff;
    const r2 = (c2 >> 16) & 0xff,
      g2 = (c2 >> 8) & 0xff,
      b2 = c2 & 0xff;

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Function to determine the color based on the offer index
  const getColor = (index, total) => {
    if (total <= 1) {
      return colors[0]; // Return the first color if there are no or only one offer
    }

    const step = (total - 1) / (colors.length - 1); // Determine step size
    const position = index / step;
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.min(lowerIndex + 1, colors.length - 1);
    const factor = position - lowerIndex;

    if (lowerIndex === upperIndex) {
      return colors[lowerIndex];
    } else {
      return interpolateColor(colors[lowerIndex], colors[upperIndex], factor);
    }
  };

  return (
    <>
      <BackButton />
      <div className="offers-container">
        {offers.map((offer, index) => (
          <div
            className="offer-card"
            key={index}
            style={{ backgroundColor: getColor(index, offers.length) }}
          >
            <div className="icon-container">
              <Tooltip message={offer.Message}>
                <Icon name="comment" theme="dark" size="medium" />
              </Tooltip>
            </div>
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
        ))}
      </div>
    </>
  );
};

export default AllOffers;

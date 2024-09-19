// OfferContext.js
import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

// Create a context for offers
export const OfferContext = createContext();

// Create a provider component
export const OfferProvider = ({ children }) => {
  const [offerCount, setOfferCount] = useState(0);
  const API = "http://localhost:3001";

  // Function to fetch the offer count based on clothes ID
  const fetchOfferCount = async (idClothes) => {
    if (!idClothes) return; // Exit if no ID is provided
    try {
      const token = Cookies.get("access-token");
      console.log("Token", token);
      if (token) {
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllOffers/${idClothes}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setOfferCount(response.data.Count);
        console.log("Offer count", response.data.Count);
      }
    } catch (error) {
      console.error("Failed to fetch offers", error);
    }
  };

  return (
    <OfferContext.Provider value={{ offerCount, fetchOfferCount }}>
      {children}
    </OfferContext.Provider>
  );
};

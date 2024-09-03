import React, { useState } from "react";
import axios from "axios";
import "./BuyPopUp.css";

import Cookies from "js-cookie";

const Modal = ({ isOpen, onClose, clothesId }) => {
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const API = "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access-token");
      console.log("token:", token);
      console.log("price:", price);
      console.log("message:", message);
      // Make an axios POST request to the backend to create the offer
      const response = await axios.post(
        `${API}/Clothing/Clothes/BuyOneClothes/${clothesId}`,
        {
          Price: price,
          Message: message,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Offer created:", response.data);
      // Handle successful response, e.g., show success message, reset form fields
      setPrice("");
      setMessage("");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating offer:", error);
      setError("Failed to create the offer. Please try again.");
      // Handle error, e.g., show error message to the user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Buy Clothes</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

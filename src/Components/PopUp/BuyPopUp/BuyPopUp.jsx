import React, { useState } from "react";
import axios from "axios";
import "./BuyPopUp.css";
import Cookies from "js-cookie";

const Modal = ({ isOpen, onClose, clothesId }) => {
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // New state for success message
  const API = "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access-token");
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

      // Display success message
      setSuccess(true);
      // if (response.data.success) {
    } catch (error) {
      console.error("Error creating offer:", error);
      setError("Failed to create the offer. Please try again.");
    }
  };

  // Close the modal and reset the state
  const handleClose = () => {
    setPrice("");
    setMessage("");
    setError("");
    setSuccess(false); // Reset success state
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>Buy Clothes</h2>

        {success ? (
          <div className="success-message">
            <p>Offer sent successfully!</p>
            <button onClick={handleClose}>Close</button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Modal;

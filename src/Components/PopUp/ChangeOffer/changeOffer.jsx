import React, { useState } from "react";
import axios from "axios";
import "./changeOffer.css";
import Cookies from "js-cookie";
import Exit from "../../../Components/Assets/x.png";

const ModalOfferChange = ({ isOpen, onClose, offerId, onOfferChange }) => {
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const API = "http://localhost:3001";

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access-token");
      const response = await axios.patch(
        `${API}/Clothing/Clothes/UpdateOffer/${offerId}`,
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
      console.log("Offer change:", response.data);

      // Set success to true, which will show the success message in the same popup
      setSuccess(true);

      // Notify parent component if needed
      if (onOfferChange) {
        onOfferChange(offerId, price, message);
      }
    } catch (error) {
      console.error("Error changing offer:", error);
      setError("Failed to change the offer. Please try again.");
    }
  };

  const handleClose = () => {
    setPrice("");
    setMessage("");
    setError("");
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={Exit} alt="exit" onClick={handleClose} className="Exit-img" />
        <h2>Change Offer</h2>

        {success ? (
          <div className="success-message">
            <p>Offer sent successfully!</p>
            <button onClick={handleClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmitChange}>
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
            <button type="submit">Change</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalOfferChange;

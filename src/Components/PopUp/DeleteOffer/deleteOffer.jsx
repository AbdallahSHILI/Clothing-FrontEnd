import React, { useEffect, useState } from "react";
import axios from "axios";
import "./deleteOffer.css";
import Cookies from "js-cookie";
import Exit from "../../../Components/Assets/x.png";

//onDeleteSuccess to automatically the offer deleted without refreshing the page
const DeleteOfferModal = ({ isOpen, onClose, offerId, onDeleteSuccess }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(Cookies.get("user-role"));
  const API = "http://localhost:3001";

  useEffect(() => {
    // Reset success and error states whenever the modal opens
    if (isOpen) {
      setSuccess(false);
      setError(null);
    }
  }, [isOpen]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access-token");
      await axios.delete(`${API}/Clothing/Clothes/DeleteOffer/${offerId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true); // Show success message
      setTimeout(() => {
        onClose(); // Close the modal
        onDeleteSuccess(offerId); // Notify the parent component about successful deletion
      }, 1500);
    } catch (error) {
      console.error("Deleting Offer Failed", error);
      setError("Failed to delete the offer, please try again.");
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  // Conditional text based on role
  const modalTitle = role === "admin" ? "Refuse Offer" : "Delete Offer";
  const successMessage =
    role === "admin"
      ? "Offer refused successfully!"
      : "Offer deleted successfully!";
  const confirmationMessage =
    role === "admin"
      ? "Are you sure you want to refuse this item?"
      : "Are you sure you want to delete this item?";
  const buttonLabel = role === "admin" ? "Refuse" : "Delete";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={Exit} alt="exit" onClick={onClose} className="Exit-img" />
        <h2>{modalTitle}</h2>
        {success ? (
          <p>{successMessage}</p>
        ) : (
          <div className="modal-card">
            <p>{confirmationMessage}</p>
            <div className="btn-container">
              <button className="btn delete-clothes" onClick={handleDelete}>
                {buttonLabel}
              </button>
              <button className="btn back-delete" onClick={handleClose}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteOfferModal;

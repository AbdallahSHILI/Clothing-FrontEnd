import React, { useState } from "react";
import axios from "axios";
import "./deleteOffer.css";
import Cookies from "js-cookie";

//onDeleteSuccess to automatically the offer deleted without refreshing the page
const DeleteOfferModal = ({ isOpen, onClose, offerId, onDeleteSuccess }) => {
  const [success, setSuccess] = useState(false);
  const API = "http://localhost:3001";

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
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Delete Offer</h2>
        {success ? (
          <p>Offer deleted successfully!</p>
        ) : (
          <div className="modal-card">
            <p>Are you sure you want to delete this item?</p>
            <div className="btn-container">
              <button className="btn delete-clothes" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn cancel-delete" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteOfferModal;

import React, { useState } from "react";
import axios from "axios";
import "./DeleteClothes.css";
import Cookies from "js-cookie";
import Exit from "../../../Components/Assets/x.png";

//onDeleteSuccess to automatically the clothes deleted without refreshing the page
const Modal = ({ isOpen, onClose, clothesId, onDeleteSuccess }) => {
  const [success, setSuccess] = useState(false);
  const API = "http://localhost:3001";

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access-token");
      await axios.delete(`${API}/Clothing/Clothes/${clothesId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true); // Show success message
      setTimeout(() => {
        onClose(); // Close the modal
        onDeleteSuccess(clothesId); // Notify the parent component about successful deletion
      }, 1500);
    } catch (error) {
      console.error("Deleting Clothes Failed", error);
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
        <img src={Exit} alt="exit" onClick={onClose} className="Exit-img" />

        <h2>Delete Clothes</h2>
        {success ? (
          <p>Clothes deleted successfully!</p>
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

export default Modal;

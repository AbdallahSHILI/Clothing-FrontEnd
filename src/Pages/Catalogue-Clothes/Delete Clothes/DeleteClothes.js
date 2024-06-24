import React from "react";
import axios from "axios";
import Icon from "react-crud-icons";

const DeleteClothes = ({ id, onDelete }) => {
  const API = "http://localhost:3001";
  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/Clothing/Clothes/${id}`);
      // After successfully deleting the item, it calls the onDelete callback to update the parent component's state.
      onDelete(id);
      // Reload the page after a short delay to ensure state updates
      setTimeout(() => {
        window.location.href = "/all-clothes";
      }, 500);
    } catch (error) {
      console.error("Deleting Clothes Failed", error);
    }
  };

  // Renders an Icon component (presumably from react-crud-icons library) which, when clicked, triggers the handleDelete function.
  return (
    <Icon
      name="delete"
      tooltip="delete"
      theme="light"
      size="medium"
      onClick={handleDelete}
    />
  );
};

export default DeleteClothes;

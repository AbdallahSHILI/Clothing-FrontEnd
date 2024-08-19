import React, { useState } from "react";
import "./MakeAdminButton.css";
import Cookies from "js-cookie";
import Axios from "axios";
import { useParams } from "react-router-dom";

const MakeAdminButton = () => {
  const { idUser } = useParams();
  const API = "http://localhost:3001";
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminMaker = async () => {
    try {
      const token = Cookies.get("access-token");

      // Make the request to promote the user to admin
      const response = await Axios.patch(
        `${API}/Clothing/Users/MakeAdmin/${idUser}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        alert("User promoted to admin successfully!");
        setIsAdmin(true); // Update state to hide the button
      } else {
        alert("Failed to promote user to admin.");
      }
    } catch (error) {
      console.error("Promoting user to admin failed", error);
      alert("An error occurred while promoting the user to admin.");
    }
  };

  // Don't render the button if the user has been promoted to admin
  if (isAdmin) {
    return null;
  }

  return (
    <button className="btn make-admin" onClick={handleAdminMaker}>
      Make Admin
    </button>
  );
};

export default MakeAdminButton;

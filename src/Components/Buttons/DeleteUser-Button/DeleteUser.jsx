import React from "react";
import "./DeleteUser.css";
import Cookies from "js-cookie";
import Axios from "axios";
import { useParams } from "react-router-dom";

const DeleteUser = () => {
  const { idUser } = useParams();
  const API = "http://localhost:3001";

  const handleDelete = async () => {
    try {
      const token = Cookies.get("access-token");

      // Make the request to promote the user to admin
      const response = await Axios.delete(
        `${API}/Clothing/Users/DeleteUser/${idUser}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "Succes") {
        alert("User deleted successfully!");
        window.location.href = "/Dashboard/UsersPage";
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Deleting user failed", error);
      alert("An error occurred while deleting the user.");
    }
  };
  return (
    <>
      <button className="btn delete-user" onClick={handleDelete}>
        Delete User
      </button>
    </>
  );
};

export default DeleteUser;

import React, { useEffect, useState } from "react";
import "./ConfirmCancelDelete.css";
import Cookies from "js-cookie";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ManPic from "../../../../Components/Assets/man.png";
import WomenPic from "../../../../Components/Assets/woman.png";
import BackButton from "../../Back-Button/BackButton";

const ConfirmCancelDelete = () => {
  const { idUser } = useParams();
  const API = "http://localhost:3001";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(
          `${API}/Clothing/Users/OneUser/${idUser}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Fetching user failed", error);
      }
    };
    fetchUser();
  }, [idUser]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const token = Cookies.get("access-token");
      const response = await Axios.delete(
        `${API}/Clothing/Users/DeleteUser/${idUser}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "Succes") {
        setTimeout(() => {}, 1000);
        navigate("/Dashboard/UsersPage");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Deleting user failed", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const userImage = user.Gender === "Male" ? ManPic : WomenPic;

  return (
    <>
      <BackButton />
      <div className="user-card">
        <img src={userImage} alt="User" className="user-avatar" />
        <h2 className="user-name">{user.FirstLastName}</h2>
        <p className="user-email">{user.Email}</p>
        <div className="user-actions">
          <button className="btn delete-user" onClick={handleDelete}>
            Confirm Delete
          </button>
          <button className="btn cancel-delete" onClick={() => navigate(-1)}>
            Cancel Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmCancelDelete;

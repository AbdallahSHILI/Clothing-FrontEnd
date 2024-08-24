import React, { useEffect, useState } from "react";
import "./ConfirmCancelAdmin.css";
import Cookies from "js-cookie";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ManPic from "../../../../Components/Assets/man.png";
import WomenPic from "../../../../Components/Assets/woman.png";
import BackButton from "../../Back-Button/BackButton";

const ConfirmCancelAdmin = () => {
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
        setTimeout(() => {}, 1000);
        navigate("/Dashboard/UsersPage");
      } else {
        alert("Failed to promote user to admin.");
      }
    } catch (error) {
      console.error("Promoting user to admin failed", error);
      alert("An error occurred while promoting the user to admin.");
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
          <button className="btn promote-user" onClick={handleAdminMaker}>
            Confirm Admin
          </button>
          <button className="btn cancel-delete" onClick={() => navigate(-1)}>
            Cancel Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmCancelAdmin;

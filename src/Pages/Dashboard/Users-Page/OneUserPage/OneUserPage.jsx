import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./OneUserPage.css";
import Cookies from "js-cookie";

const OneUserPage = () => {
  const { idUser } = useParams();
  const [user, setUser] = useState(null);
  const API = "http://localhost:3001";

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
        console.error("Fetching user Failed", error);
      }
    };
    fetchUser();
  }, [idUser]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-page-container">
      <h1 className="user-page-title">User Details</h1>
      <div className="user-info">
        <div className="user-info-item">
          <span className="user-info-label">Name:</span>
          <span className="user-info-value">{user.FirstLastName}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Email:</span>
          <span className="user-info-value">{user.Email}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Role:</span>
          <span className={`user-role ${user.Role.toLowerCase()}`}>
            {user.Role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneUserPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import "./OneUserPage.css";
import ManPic from "../../../../Components/Assets/man.png";
import WomenPic from "../../../../Components/Assets/woman.png";
import { BackButton, MakeAdminButton } from "../../../../Components/Index";
import DeleteUser from "../../../../Components/Buttons/DeleteUser-Button/DeleteUser";

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
        console.error("Fetching user failed", error);
      }
    };
    fetchUser();
  }, [idUser]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const userImage = user.Gender === "Male" ? ManPic : WomenPic;

  return (
    <>
      <BackButton />
      <div className="user-card">
        <img src={userImage} alt="User" className="user-avatar" />
        <h2 className="user-name">{user.FirstLastName}</h2>
        <p className="user-email">{user.Email}</p>
        <div className="user-actions">
          <MakeAdminButton />
          <DeleteUser userId={user._id} />
        </div>
      </div>
    </>
  );
};

export default OneUserPage;

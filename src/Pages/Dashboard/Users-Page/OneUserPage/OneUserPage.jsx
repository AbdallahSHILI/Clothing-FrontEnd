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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
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

  const handlePromote = () => {
    setIsAdmin(true); //  to track whether the user is an admin or not. When the user is promoted to an admin, isAdmin is set to true.
    setIsConfirming(true); // Hide confirm buttons after promotion
  };

  const handleCancel = () => {
    setIsConfirming(false); // Hide confirm buttons and show original buttons
  };

  const showConfirmButtons = () => {
    setIsConfirming(true); // Show confirm and cancel buttons
  };

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

        {/* Only show the action buttons if the user is not an admin and we are not in confirmation mode */}
        {!isAdmin && !isConfirming && user.Role !== "admin" && (
          <div className="user-actions">
            <MakeAdminButton
              onPromote={handlePromote}
              onShowConfirm={showConfirmButtons}
            />
            <DeleteUser />
          </div>
        )}

        {/* Show confirm/cancel buttons if in confirmation mode */}
        {isConfirming && (
          <div className="confirm-actions">
            <button className="btn confirm-admin" onClick={handlePromote}>
              Confirm
            </button>
            <button className="btn cancel-admin" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OneUserPage;

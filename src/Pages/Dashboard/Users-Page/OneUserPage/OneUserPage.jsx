import React from "react";
import "./OneUserPage.css";

const OneUserPage = ({ user }) => {
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

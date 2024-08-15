import React from "react";
import "./UsersPage.css";
import { useLocation } from "react-router-dom";

const UsersPage = () => {
  const location = useLocation();
  const { users, countUsers } = location.state;
  console.log(countUsers);
  return (
    <div className="users-container">
      <div className="badge-container">{countUsers} Users</div>
      <h1>All Users</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <span className="user_FirstLastName">{user.FirstLastName}</span>
            <span className="user_info">{user.Email}</span>
            <button className="moreInfo_Button">More Info</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

import React from "react";
import Icon from "react-crud-icons";
import { Link } from "react-router-dom";
import "./UsersPage.css";
import { useLocation } from "react-router-dom";

const UsersPage = () => {
  const location = useLocation();
  const { users, countUsers } = location.state;

  return (
    <div className="users-container">
      <h1>All Users</h1>
      <div className="badge-container">{countUsers} Users</div>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            {/* use the class of "user-details" to make name align wih email */}
            <div className="user-details">
              <span className="user_FirstLastName">{user.FirstLastName}</span>
              <span className="user_info">{user.Email}</span>
            </div>
            <div className={`user_role ${user.Role.toLowerCase()}`}>
              {user.Role}
            </div>
            <Link to={`/Dashboard/UsersPage/${user._id}`}>
              <Icon
                name="arrow-right"
                tooltip="More Info"
                theme="light"
                size="medium"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

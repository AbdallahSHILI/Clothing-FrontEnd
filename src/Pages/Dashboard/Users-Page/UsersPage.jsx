import React from "react";
import Icon from "react-crud-icons";
import { Link } from "react-router-dom";
import "./UsersPage.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BackButton } from "../../../Components/Index";
import CountContainer from "../../Catalogue-Clothes/CountContainer/CountContainer";

const UsersPage = () => {
  const [countUsers, setCountUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const API = "http://localhost:3001";
  const token = Cookies.get("access-token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Users/AllUsers`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
        setCountUsers(response.data.result);
      } catch (error) {
        console.error("Fetching Users Failed", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <BackButton />
      <div className="users-container">
        <h1>All Users</h1>
        <CountContainer>{countUsers} Users</CountContainer>
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
    </>
  );
};

export default UsersPage;

import React from "react";
import Icon from "react-crud-icons";
import "./Dashboard.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [countUsers, setCountUsers] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [countClothes, setCountClothes] = useState([]);
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

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/AllClothes`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setClothes(response.data.clothes);
        setCountClothes(response.data.result);
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card users-card">
        <div className="header-card">
          <h1>{countUsers}</h1>
          <h4>Users</h4>
        </div>

        <div className="footer-card">
          <Link
            to={`/Dashboard/UsersPage`}
            state={{ users, countUsers }}
            className="link-style"
          >
            <h1>More info</h1>
            <Icon name="list" tooltip="list" theme="light" size="medium" />
          </Link>
        </div>
      </div>
      <div className="dashboard-card products-card">
        <div className="header-card">
          <h1>{countClothes}</h1>
          <h4>Clothes</h4>
        </div>
        <div className="footer-card">
          <Link
            to={`/AllClothes`}
            state={{ clothes, countClothes }}
            className="link-style"
          >
            <h1>More info</h1>
            <Icon name="list" tooltip="list" theme="light" size="medium" />
          </Link>
        </div>
      </div>
      <div className="dashboard-card sales-card">
        <div className="header-card">
          <h1>20</h1>
          <h4>Sales</h4>
        </div>
        <div className="footer-card">
          <h1>More info</h1>
          <Icon name="list" tooltip="list" theme="light" size="medium" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

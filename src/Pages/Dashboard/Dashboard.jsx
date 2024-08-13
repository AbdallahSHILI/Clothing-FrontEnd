import React from "react";
import Icon from "react-crud-icons";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card users-card">
        <div className="header-card">
          <h1>20</h1>
          <h4>Users</h4>
        </div>
        <div className="footer-card">
          <h1>More info</h1>
          <Icon name="list" tooltip="list" theme="light" size="medium" />
        </div>
      </div>
      <div className="dashboard-card products-card">
        <div className="header-card">
          <h1>20</h1>
          <h4>Products</h4>
        </div>
        <div className="footer-card">
          <h1>More info</h1>
          <Icon name="list" tooltip="list" theme="light" size="medium" />
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

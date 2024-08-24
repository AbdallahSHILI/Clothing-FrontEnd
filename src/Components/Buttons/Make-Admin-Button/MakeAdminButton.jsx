import React from "react";
import "./MakeAdminButton.css";
import { Link } from "react-router-dom";

const MakeAdminButton = ({ userId }) => {
  return (
    <>
      <Link to={`/Dashboard/UsersPage/PromoteUser/${userId}`}>
        <button className="btn make-admin">Make Admin</button>
      </Link>
    </>
  );
};

export default MakeAdminButton;

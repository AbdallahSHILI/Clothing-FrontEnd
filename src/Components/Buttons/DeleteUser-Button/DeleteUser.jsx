import React from "react";
import "./DeleteUser.css";
import { Link } from "react-router-dom";

const DeleteUser = ({ userId }) => {
  return (
    <>
      <Link to={`/Dashboard/UsersPage/DeleteUser/${userId}`}>
        <button className="btn delete-user">Delete User</button>
      </Link>
    </>
  );
};

export default DeleteUser;

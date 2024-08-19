import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "react-crud-icons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-icon" onClick={() => navigate(-1)}>
      <Icon name="arrow-left" tooltip="Back" theme="light" size="large" />
    </div>
  );
};
export default BackButton;

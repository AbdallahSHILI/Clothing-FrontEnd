import React, { useState, useEffect } from "react";
import "./AllModels.css";
import Axios from "axios";

const AllModels = () => {
  const [models, setModels] = useState([]);
  const API = "http://localhost:3001";

  //Used useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        setModels(response.data.doc);
      } catch (error) {
        console.error("Fetching Models Failed", error);
      }
    };
    fetchModels();
  }, []);

  return (
    <div className="models_container">
      {models.map((model, index) => (
        <div key={index} className="model_card">
          <p>Description: {model.Description}</p>
          <p>
            Creation Date: {new Date(model.creationDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllModels;

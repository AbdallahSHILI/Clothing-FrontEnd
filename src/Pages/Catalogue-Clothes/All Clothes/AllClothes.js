import React, { useState, useEffect } from "react";
import "./AllClothes.css";
import Axios from "axios";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";

const AllClothes = () => {
  const [Clothes, setClothes] = useState([]);
  const [clickedHearts, setClickedHearts] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get(`${API}/Clothing/Clothes/`);
        setClothes(response.data.doc);
        // Initialize clickedHearts state with false for each clothing item
        //Create a new array of length 3 (since there are 3 clothing items).
        // Fill this array with false values, indicating that none of the hearts are clicked initially.
        //[false , false , false]
        setClickedHearts(new Array(response.data.doc.length).fill(false));
      } catch (error) {
        console.error("Fetching Clothes Failed", error);
      }
    };
    fetchClothes();
  }, []);

  const handleHeartClick = (index) => {
    //First, we create a copy of the current clickedHearts array using the spread operator (...)
    const newClickedHearts = [...clickedHearts]; // newClickedHearts is [false, false, false]
    //Next, we toggle the state of the heart at the specified index. If the current state is false, it changes to true, and vice versa:
    newClickedHearts[index] = !newClickedHearts[index]; //if true the turn to false and vice versa
    //Finally, we update the clickedHearts state with the modified array:
    setClickedHearts(newClickedHearts);
  };

  return (
    <div className="models_container">
      {Clothes.map((clothes, index) => (
        <div key={index} className="model_card">
          <p>Description: {clothes.Description}</p>
          <p>
            Creation Date: {new Date(clothes.CreationDate).toLocaleDateString()}
          </p>
          {clothes.Image && (
            <img
              src={`${API}/images/${clothes.Image}`}
              alt={clothes.Description}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Heart
            isClick={clickedHearts[index]}
            onClick={() => handleHeartClick(index)}
          />
          <Icon
            name="delete"
            tooltip="delete"
            theme="light"
            size="medium"
            // onClick={doSomething}
          />
          <Icon
            name="browse"
            tooltip="browse"
            theme="light"
            size="medium"
            // onClick={doSomething}
          />
        </div>
      ))}
    </div>
  );
};

export default AllClothes;

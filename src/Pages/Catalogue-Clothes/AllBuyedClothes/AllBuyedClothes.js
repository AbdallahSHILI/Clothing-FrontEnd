import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Cookies from "js-cookie";
import "./AllBuyedClothes.css";

export const AllBuyedClothes = () => {
  const [offres, setOffres] = useState([]);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(
          `${API}/Clothing/Clothes/AllBuyClothes`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setOffres(response.data.offres);
      } catch (error) {
        console.error("Fetching offres Failed", error);
      }
    };
    fetchOffres();
  }, []);

  // const handleBuy = async (index, id, currentBuyingStatus) => {
  //   try {
  //     // Toggle favorite status
  //     const newBuyingStatus = !currentBuyingStatus;

  //     const response = await Axios.patch(
  //       `${API}/Clothing/Clothes/BuyOneClothes/${id}`,
  //       {
  //         Buyed: newBuyingStatus,
  //       }
  //     );

  //     // Update Buying status in the frontend
  //     // Creating a copy of the array
  //     // Create a new version of the state, modify it, and then update the state with this new version.
  //     const newClothes = [...BuyedClothes];
  //     newClothes[index].Buyed = newBuyingStatus;
  //     setBuyedClothes(newClothes);

  //     // Remove the item from the list if it's been unbought
  //     if (!newBuyingStatus) {
  //       setBuyedClothes((prevClothes) =>
  //         prevClothes.filter((_, i) => i !== index)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Buying Clothes Failed", error);
  //   }
  // };

  return (
    <div className="buy_models_container">
      {offres.map((offre, index) => (
        <div key={offre._id} className="buy_model_card">
          <div className="buy_Header">
            <h1 className="buy_description">{offre.Description}</h1>
          </div>
          <hr />
          {offre.Image && (
            <Link to={`/OneClothes/${offre._id}`}>
              <img
                src={`${API}/images/${offre.Image}`}
                alt={offre.Description}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Link>
          )}
          <button
            onClick={() => handleBuy(index, offre._id, offre.Buyed)}
            className="buy_Buy_Button"
          >
            Unbuy
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllBuyedClothes;

import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllClothes.css";
import Heart from "react-animated-heart";
import "react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import DeleteClothes from "../Delete Clothes/DeleteClothes";
import Modal from "react-modal";

const AllClothes = () => {
  const [Clothes, setClothes] = useState([]);
  const [clickedHearts, setClickedHearts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // we don't need the modal to be open directly
  const [selectedClothes, setSelectedClothes] = useState(null);
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

  const handleDelete = (id) => {
    console.log("Clothes", Clothes);
    // Remove the clothing item from the state after it has been deleted
    setClothes((prevClothes) =>
      prevClothes.filter((clothes) => clothes._id !== id)
    );
    console.log("Clothes", Clothes);
  };

  const openModal = (clothes) => {
    setSelectedClothes(clothes);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedClothes(null);
  };

  return (
    <div className="models_container">
      {Clothes.map((clothes, index) => {
        let cardClass = "model_card";
        if (clickedHearts[index]) {
          cardClass += " clicked";
        }
        return (
          <div key={clothes._id} className={cardClass}>
            <div className="Header">
              <h1 className="description">{clothes.Description}</h1>
              <div className="heart">
                <Heart
                  isClick={clickedHearts[index]}
                  onClick={() => handleHeartClick(index)}
                />
              </div>
            </div>
            <hr />
            {clothes.Image && (
              <img
                src={`${API}/images/${clothes.Image}`}
                alt={clothes.Description}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
            <p>
              Creation Date:{" "}
              {new Date(clothes.CreationDate).toLocaleDateString()}
            </p>
            <div className="icon_container">
              <div className="icon">
                <DeleteClothes id={clothes._id} onDelete={handleDelete} />
              </div>
              <div className="icon">
                <Icon
                  name="browse"
                  tooltip="browse"
                  theme="light"
                  size="medium"
                  onClick={() => openModal(clothes)}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* the component inside the parentheses will only be rendered if 
the condition before the && operator is true */}
      {selectedClothes && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          contentLabel="Clothes Details"
          className="modal"
          // The overlayClassName prop to add a transparent overlay behind the modal.
          overlayClassName="modal-overlay"
        >
          <h2>{selectedClothes.Description}</h2>
          <img
            src={`${API}/images/${selectedClothes.Image}`}
            alt={selectedClothes.Description}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <p>
            Creation Date:{" "}
            {new Date(selectedClothes.CreationDate).toLocaleDateString()}
          </p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default AllClothes;

import React, { useState, useRef } from "react";
import "./NewClothes.css";
import Axios from "axios";

const NewClothes = () => {
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null); // Create a ref for the file input
  const API = "http://localhost:3001";

  const onSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    // Append the Description and Image to the formData
    formData.append("Description", Description);
    formData.append("Image", Image);

    try {
      // Post the formData to the server
      const response = await Axios.post(`${API}/Clothing/Clothes/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Clothes sent successfully!");
      setDescription("");
      setImage(null);
      fileInputRef.current.value = ""; // Clear the file input manually

      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Sending Clothes Failed", error);
      setMessage("Sending Clothes Failed");
    }
  };

  return (
    <div>
      <form className="container_element" onSubmit={onSubmit}>
        <span>Description</span>
        <input
          type="text"
          name="Description"
          id="Description"
          value={Description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="Image"
          id="Image"
          accept="image/*"
          required
          ref={fileInputRef} // Attach the ref to the file input
          onChange={(e) => setImage(e.target.files[0])} // Get the first file selected by the user
        />
        <button type="submit" className="send_btn">
          Send
        </button>
        {message && (
          <div className={`Message ${message && "fadeIn"}`}>{message}</div>
        )}
      </form>
    </div>
  );
};

export default NewClothes;

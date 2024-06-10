import React, { useState } from "react";
import "./NewModel.css";
import Axios from "axios";

const NewModel = () => {
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // State to store the selected image file
  const [message, setMessage] = useState("");
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
      setMessage("Model sent successfully!");
      setDescription("");
      setImage(null); // Reset the selected image
    } catch (error) {
      console.error("Sending Model Failed", error);
      setMessage("Sending Model Failed");
    }
  };

  return (
    <div>
      <form className="container_element" onSubmit={onSubmit}>
        <span>Email</span>
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
          onChange={(e) => setImage(e.target.files[0])} // Get the first file selected by the user
        />
        <button type="submit" className="send_btn">
          Send
        </button>
        {message && <div className="Message">{message}</div>}
      </form>
    </div>
  );
};

export default NewModel;

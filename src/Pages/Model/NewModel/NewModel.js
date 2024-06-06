import React, { useState } from "react";
import "./NewModel.css";
import Axios from "axios";

const NewModel = () => {
  const [Description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const API = "http://localhost:3001";

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`${API}/Clothing/Clothes/`, {
        Description,
      });
      setMessage("Model sent successfully!");
      setDescription("");
    } catch (error) {
      console.error("Sending Model Failed", error);
      setMessage("Sending Model Failed");
    }
  };

  return (
    <div>
      <form className="container_element" onSubmit={onSubmit}>
        <input
          type="text"
          name="Description"
          id="Description"
          value={Description}
          required
          onChange={(e) => setDescription(e.target.value)}
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

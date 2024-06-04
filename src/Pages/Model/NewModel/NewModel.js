import React from "react";

import "./NewModel.css";

const NewModel = () => {
  return (
    <div className="container_element">
      <input type="text" name="Description" id="Description" required />
      <button type="submit" className="btn">
        Send
      </button>
    </div>
  );
};

export default NewModel;

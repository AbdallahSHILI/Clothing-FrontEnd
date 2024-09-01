import React, { useContext, useEffect, useState } from "react";
import "./All-Messages.css";
import Axios from "axios";
import Cookies from "js-cookie";
import Icon from "react-crud-icons";
import { BackButton } from "../../../Components/Index";
// import ManPic from "../../../../Components/Assets/man.png";
// import WomenPic from "../../../../Components/Assets/woman.png";
import CountContainer from "../../Catalogue-Clothes/CountContainer/CountContainer";
// 1- Import the context to use it for count messages
import { MessageContext } from "../../../useContext/messageContext";
import SearchBar from "../SearchBar/searchBar";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  // 2- Destructure setMessageCount from context
  const { setMessageCount } = useContext(MessageContext);
  const API = "http://localhost:3001";

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = Cookies.get("access-token");
        const response = await Axios.get(`${API}/Clothing/Users/AllMessages`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data.messages);
        setFilteredMessages(response.data.messages);
      } catch (error) {
        console.error("Fetching Messages Failed", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSearch = (searchTerm) => {
    // Check if searchTerm is empty
    if (searchTerm.trim() === "") {
      console.log("No search term");
      // No search term, show all messages
      setFilteredMessages(messages);
    } else {
      console.log("Search term", searchTerm);
      // Filter messages based on the search term
      const filtered = messages.filter((message) =>
        message.FirstLastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  const handleRowClick = (message) => {
    setSelectedMessage(message._id);
  };

  return (
    <>
      <BackButton />
      <div className="messages-container">
        <h1>All Messages</h1>
        <CountContainer>{filteredMessages.length} Messages</CountContainer>
        {/* Search and Filter Options */}
        <SearchBar onSearch={handleSearch} />{" "}
        {/* Use the SearchBar component */}
        {/* Messages Table */}
        {/* Conditionally render the no user message */}
        {filteredMessages.length === 0 && messages.length > 0 ? (
          <p className="no-user-message">There is no user with that name.</p>
        ) : (
          <table className="messages-table">
            <thead>
              <tr>
                <th></th>
                <th>User Name</th>
                <th>Message Type</th>
                <th>Time</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message, index) => (
                <tr
                  key={message._id}
                  className={
                    selectedMessage === message._id ? "highlighted-row" : ""
                  }
                  onClick={() => handleRowClick(message)}
                >
                  <td>{index + 1}</td>
                  <td>{message.FirstLastName}</td>
                  <td>{message.WhatIsAbout}</td>
                  <td>{new Date(message.Date).toLocaleDateString("fr-FR")}</td>
                  <td>{message.Message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AllMessages;

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

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
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
        // 3- Update the message count in context
        setMessageCount(response.data.result);
        console.log("messages :", messages);
        console.log("count :", response.data.result);
      } catch (error) {
        console.error("Fetching Messages Failed", error);
      }
    };
    fetchMessages();
  }, [setMessageCount]);

  const handleRowClick = (message) => {
    setSelectedMessage(message._id);
  };

  return (
    <>
      <BackButton />
      <div className="messages-container">
        <h1>All Messages</h1>
        <CountContainer>{messages.length} Messages</CountContainer>

        {/* Search and Filter Options */}
        <div className="search-filter-container">
          <input type="text" placeholder="Search" className="search-input" />
          <Icon name="search" size="medium" />
        </div>

        {/* Messages Table */}
        <table className="messages-table">
          <thead>
            <tr>
              <th></th>
              <th>
                User Name <Icon name="sort" size="small" />
              </th>
              <th>
                Message Type <Icon name="sort" size="small" />
              </th>
              <th>
                Time <Icon name="sort" size="small" />
              </th>
              <th>
                Message <Icon name="sort" size="small" />
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
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
      </div>
    </>
  );
};

export default AllMessages;

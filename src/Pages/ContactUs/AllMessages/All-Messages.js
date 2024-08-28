import React, { useContext, useEffect, useState } from "react";
import "./All-Messages.css";
import Axios from "axios";
import Cookies from "js-cookie";
import Icon from "react-crud-icons";
import { BackButton } from "../../../Components/Index";
import CountContainer from "../../Catalogue-Clothes/CountContainer/CountContainer";
// 1- Import the context to use it for count messages
import { MessageContext } from "../../../useContext/messageContext";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
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

  return (
    <>
      <BackButton />
      <div className="messages-container">
        <h1>All Messages</h1>
        <CountContainer>{messages.length} Messages</CountContainer>
        <ul className="messages-list">
          {messages.map((message) => (
            <li key={message._id} className="message-item">
              {/* use the class of "user-details" to make name align wih email */}
              <div className="message-details">
                <span className="message_FirstLastName">
                  {message.FirstLastName}
                </span>
                <span className="message">{message.Email}</span>
              </div>
              {/* <Link to={`/Dashboard/UsersPage/${message._id}`}> */}
              <Icon
                name="arrow-right"
                tooltip="More Info"
                theme="light"
                size="medium"
              />
              {/* </Link> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllMessages;

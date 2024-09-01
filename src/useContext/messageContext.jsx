import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

// Create a context for messages
export const MessageContext = createContext();

// Create a provider component
export const MessageProvider = ({ children }) => {
  const [messageCount, setMessageCount] = useState(0);
  const API = "http://localhost:3001"; // Your API URL

  // Fetch message count when the provider is mounted
  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const token = Cookies.get("access-token");
        if (token) {
          const response = await Axios.get(
            `${API}/Clothing/Users/AllMessages`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          // Assuming response.data.result contains the count of messages
          setMessageCount(response.data.result);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessageCount();
  }, []); // Empty dependency array to run once on mount

  return (
    <MessageContext.Provider value={{ messageCount, setMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
};

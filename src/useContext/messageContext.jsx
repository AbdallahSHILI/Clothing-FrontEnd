
import React, { createContext, useState } from 'react';

// Create a context for messages
export const MessageContext = createContext();

// Create a provider component
export const MessageProvider = ({ children }) => {
  const [messageCount, setMessageCount] = useState(0);

  return (
    <MessageContext.Provider value={{ messageCount, setMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
};

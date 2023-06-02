import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatConversation from "../components/ChatComponent";
import "../index.css";

const Home = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleSelectNumber = (number) => {
    setSelectedNumber(number);
  };

  return (
    <div className="whatsapp-container">
      <Sidebar onSelectNumber={handleSelectNumber} />
      <div className="chat-container">
        {selectedNumber ? (
          <ChatConversation selectedNumber={selectedNumber} />
        ) : (
          <div className="empty-chat">Select a number to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Home;

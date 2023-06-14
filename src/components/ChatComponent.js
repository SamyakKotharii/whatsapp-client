import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatConversation from "./ChatConversation";
import "../index.css";

const ChatComponent = ({ selectedNumber }) => {
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://darkhorsestockscloud.onrender.com/messages/${selectedNumber}`
      );
      console.log("Response", response.data);
      setMessages(response.data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Failed to fetch messages. Please try again."); // Set error message
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedNumber, fetchMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://darkhorsestockscloud.onrender.com/send-message",
        {
          to: selectedNumber,
          text: {
            preview_url: false,
            body: body,
          },
        }
      );
      setBody("");
      fetchMessages();
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Failed to send message. Please try again."); // Set error message
    }
  };

  return (
    <div className="chat-component">
      <div className="message-container">
        {selectedNumber && (
          <div className="selected-number">{selectedNumber}</div>
        )}
        {error && <div className="error">{error}</div>}{" "}
        {/* Display error message */}
        <ChatConversation messages={messages} />
      </div>
      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;

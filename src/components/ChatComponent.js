import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatConversation from "./ChatConversation";
import "../index.css";

const ChatComponent = ({ selectedNumber }) => {
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://darkhorsestockscloud.onrender.com/messages/${selectedNumber}`
      );
      console.log("Response", response.data);

      // Update messages with the response data for the selected number
      setMessages(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    // Fetch messages from the API when the component mounts or when selectedNumber changes
    fetchMessages();
  }, [selectedNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the API endpoint
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

      // Clear the form after successful submission
      setBody("");

      // Fetch updated messages after sending a new message
      fetchMessages();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="chat-component">
      <div className="message-container">
        {selectedNumber && (
          <div className="selected-number">{selectedNumber}</div>
        )}
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

import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [chat, setChat] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://darkhorsestockscloud.onrender.com/webhook"
      );
      setChat(response.data.entry[0].changes[0].value.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Received Messages:</h1>
      {chat.map((message, index) => (
        <div key={index}>
          <p>From: {message.from}</p>
          <p>Message: {message.text.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;

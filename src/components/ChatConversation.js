import React, { useEffect, useRef } from "react";
import "../index.css";

const ChatConversation = ({ messages }) => {
  const chatConversationRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatConversationRef.current) {
      chatConversationRef.current.scrollTop =
        chatConversationRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat-conversation">
      <div className="chat-conversation-inner" ref={chatConversationRef}>
        {messages.map((message) => (
          <div
            key={message._id}
            className={message.role === 1 ? "message-left" : "message-right"}
          >
            {message.text.map((textMessage, index) => (
              <div key={index} className="message-text">
                {textMessage.role === 1 ? (
                  <div className="message-left-text">
                    {textMessage.text}
                    <span className="timestamp">
                      {new Date(textMessage.timestamp).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                ) : (
                  <div className="message-right-text">
                    {textMessage.text}
                    <span className="timestamp">
                      {new Date(textMessage.timestamp).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatConversation;

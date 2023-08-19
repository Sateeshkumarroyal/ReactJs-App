import React, { useState } from 'react';
import './MessagingApp.css'

const hardcodedConversations = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Smith',
  },
  {
    id: 3,
    name: 'Alice Johnson',
  }
];

const hardcodedMessages = {
  1: [
    { id: 1, sender: 'John Doe', content: 'Hello!', timestamp: 1629876597000 },
    { id: 2, sender: 'John Doe', content: 'How are you?', timestamp: 1629876612000 },
  ],
  2: [
    { id: 1, sender: 'Jane Smith', content: 'Hi there!', timestamp: 1629876648000 },
  ],
  3: [
    { id: 1, sender: 'Alice Johnson', content: 'Hi there!', timestamp: 1629876648000 },
  ],
};

function MessagingApp() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    setMessages(hardcodedMessages[conversationId]);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: messageInput,
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className="messaging-app-container">
      <div className="conversations">
        <h1>In-App Messages</h1>
        {hardcodedConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation.id)}
            className={`conversation ${selectedConversation === conversation.id ? 'active' : ''}`}
          >
            {conversation.name}
          </div>
        ))}
      </div>
      <div>
        {selectedConversation && (
          <div>
            <div className="message-list">
              {messages.map((message) => (
                <div key={message.id} className="message">
                  <span className="sender">{message.sender}: </span>
                  {message.content}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagingApp;

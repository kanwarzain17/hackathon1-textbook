import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

const SimpleChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Book Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiUrl = 'http://localhost:8000/query';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
          session_id: null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response || "I'm sorry, I couldn't process that request.",
        sender: 'bot',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: 'bot',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
        <div style={{
          backgroundColor: '#1061f6',
          color: 'white',
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }} onClick={toggleChat}>
          <strong>Book Assistant</strong>
          <button
            onClick={(e) => { e.stopPropagation(); toggleChat(); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>

        {isOpen && (
          <div>
            <div style={{
              padding: '15px',
              minHeight: '200px',
              maxHeight: '300px',
              overflowY: 'auto',
              backgroundColor: '#f9f9f9',
              borderBottom: '1px solid #eee',
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '10px',
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: '18px',
                      backgroundColor: message.sender === 'user' ? '#1061f6' : '#e9ecef',
                      color: message.sender === 'user' ? 'white' : '#333',
                      maxWidth: '80%',
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: '18px',
                      backgroundColor: '#e9ecef',
                      color: '#333',
                    }}
                  >
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              display: 'flex',
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginRight: '10px',
                }}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '10px 15px',
                  backgroundColor: isLoading ? '#cccccc' : '#1061f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
                disabled={!inputValue.trim() || isLoading}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleChat;

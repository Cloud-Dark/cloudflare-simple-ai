import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { marked } from 'marked';

function App() {
  const [model, setModel] = useState('@cf/qwen/qwen1.5-14b-chat-awq');
  const [systemMessage, setSystemMessage] = useState('You are a helpful assistant');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [tokenLength, setTokenLength] = useState(512);
  const [responseTimes, setResponseTimes] = useState([]); // Stores each response time
  const [lastResponseTime, setLastResponseTime] = useState(0); // Stores the last response time
  const [liveTimer, setLiveTimer] = useState(0); // For live display of the timer in ms
  const [isWaiting, setIsWaiting] = useState(false); // Track if waiting for response

  const models = [
    '@cf/meta/llama-2-7b-chat-int8',
    '@cf/meta/llama-3.2-11b-vision-instruct',
    '@hf/google/gemma-7b-it',
    '@cf/qwen/qwen1.5-7b-chat-awq',
    '@cf/qwen/qwen1.5-14b-chat-awq',];

  // Calculate average response time
  const averageResponseTime = responseTimes.length > 0 
    ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)
    : 0;

  // Update the live timer every 100 ms while waiting for response
  useEffect(() => {
    let timer;
    if (isWaiting) {
      timer = setInterval(() => setLiveTimer((prev) => prev + 0.1), 100); // Increment live timer every 100 ms
    } else {
      clearInterval(timer);
      setLiveTimer(0); // Reset live timer when not waiting
    }
    return () => clearInterval(timer);
  }, [isWaiting]);

  const handleSendMessage = async () => {
    const newMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setUserInput('');

    // Start timing the response
    const startTime = Date.now();
    setIsWaiting(true);

    const data = JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: systemMessage },
        ...updatedMessages
      ]
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.BACKEND_SERVER, // Access the environment variable
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    

    try {
      const response = await axios.request(config);

      // Stop timing the response
      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000; // Convert ms to seconds

      // Update last response time and add to responseTimes array
      setLastResponseTime(responseTime);
      setResponseTimes([...responseTimes, responseTime]);
      setIsWaiting(false); // Stop live timer

      // Extract assistant's response and replace \n with <br /> for new lines
      const assistantMessageContent = marked(response.data[0].response.response.replace(/\n/g, '<br />'));
      const assistantMessage = {
        role: 'assistant',
        content: assistantMessageContent
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setIsWaiting(false); // Stop live timer if there's an error
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Workers AI LLM Playground ✨</h1>
        <p>Explore different Text Generation models by drafting messages and fine-tuning your responses.</p>
        
        <label htmlFor="model-select">Model</label>
        <select id="model-select" value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map((modelOption) => (
            <option key={modelOption} value={modelOption}>
              {modelOption}
            </option>
          ))}
        </select>
        
        <label htmlFor="system-message">System Message</label>
        <textarea
          id="system-message"
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
        />

        <label>Maximum Output Length (Tokens)</label>
        <input
          type="range"
          min="1"
          max="1024"
          value={tokenLength}
          onChange={(e) => setTokenLength(e.target.value)}
        />
        <p>{tokenLength} tokens</p>

        <p><strong>Average Response Time:</strong> {averageResponseTime} seconds</p>
        <p><strong>Last Response Time:</strong> {isWaiting ? `${liveTimer.toFixed(1)} seconds` : `${lastResponseTime.toFixed(2)} seconds`}</p>
      </div>

      <div className="chat-container">
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <span>{msg.role === 'user' ? 'User' : 'Assistant'}:</span>
              <span
                dangerouslySetInnerHTML={{ __html: msg.content }}
              ></span>
            </div>
          ))}
        </div>
        <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevents newline character
              handleSendMessage();
            }
          }}
          placeholder="Enter a message..."
        />

          <button onClick={handleSendMessage}>Run ✨</button>
        </div>
      </div>
    </div>
  );
}

export default App;

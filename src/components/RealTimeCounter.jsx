import React, { useState, useEffect } from 'react';

const RealTimeCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Create a new WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:8080');

    // Event listener for when the connection is open
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // Event listener for incoming messages from the server
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'counterUpdate') {
        setCount(message.value);
      }
    };

    // Event listener for when the connection is closed
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Event listener for errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Real-Time Counter</h1>
      <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{count}</p>
    </div>
  );
};

export default RealTimeCounter;
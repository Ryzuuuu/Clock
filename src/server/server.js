const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

let count = 0;

// Set up an interval to update the counter every second
setInterval(() => {
    count++;
    // Broadcast the new counter value to all connected clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'counterUpdate', value: count }));
        }
    });
}, 1000); // Update every 1000ms (1 second)

wss.on('connection', ws => {
    console.log('Client connected');
    
    // Send the initial count to the new client
    ws.send(JSON.stringify({ type: 'counterUpdate', value: count }));

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8080 });

let count = 0;


setInterval(() => {
    count++;
   
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'counterUpdate', value: count }));
        }
    });
}, 1000); 

wss.on('connection', ws => {
    console.log('Client connected');
    
    
    ws.send(JSON.stringify({ type: 'counterUpdate', value: count }));

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });
});


console.log('WebSocket server is running on ws://localhost:8080');

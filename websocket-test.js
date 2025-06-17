const { io } = require('socket.io-client');

// Replace with your server URL (local or production)
const SERVER_URL = 'http://localhost:3000';
const DESK_ID = '123'; // Replace with an actual desk ID you want to test

// Connect to the server
const socket = io(SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 5000,
});

// Connection events
socket.on('connect', () => {
  console.log('Connected to server!');
  console.log('Socket ID:', socket.id);
  
  // Join a desk room
  socket.emit('joinDesk', DESK_ID);
  console.log(`Joined desk room: ${DESK_ID}`);
});

// Listen for desk:height events (API -> Client)
socket.on('desk:height', (data) => {
  console.log('Received height adjustment command:', data);
  
  // Simulate acknowledging the command after 2 seconds
  setTimeout(() => {
    console.log(`Acknowledging command ${data.cmdId}`);
    socket.emit('desk:ack', { cmdId: data.cmdId });
  }, 2000);
});

// Error and disconnect handling
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

// Keep the script running
console.log('Waiting for events... (Press Ctrl+C to exit)');
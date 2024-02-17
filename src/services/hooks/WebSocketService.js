import io from 'socket.io-client';


const socket = io('https://drivista.onrender.com'); // Replace with your server URL

// socket.on('connect', () => {
//   console.log('WebSocket connected');
// });

// socket.on('notification', notification => {
//   console.log('Received notification:', notification);

// });

export {socket};

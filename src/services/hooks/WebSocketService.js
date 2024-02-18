import io from 'socket.io-client';
import {notificationHandler} from './AndroidNotificationHandler';

const socket = io('https://drivista.onrender.com'); // Replace with your server URL

// socket.on('connect', () => {
//   console.log('WebSocket connected in websocketservice file');
// });

socket.on('notification', notification => {
  console.log('Received notification:', notification);
  notificationHandler(notification.event, notification.message, new Date());

});

export {socket};

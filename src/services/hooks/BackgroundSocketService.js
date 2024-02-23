import BackgroundService from 'react-native-background-actions';
import io from 'socket.io-client';
import {notificationHandler} from './AndroidNotificationHandler'; // Import your notification handler function
import {socket} from './WebSocketService';
//const socket = io('https://drivista.onrender.com');

const connectToSocketAndCreateRoom = async id => {
  console.log('WebSocket connected:', id);
  socket.on('connect', () => {
    console.log('WebSocket connected inside:', id);
    socket.emit('create_room', id);
  });

  socket.on('notification', notification => {
    console.log('Received notification:', notification);
    // Handle the notification here (e.g., display a notification to the user)
    notificationHandler(notification.event, notification.message, new Date());
  });
};

const startBackgroundSocketService = async id => {
  console.log('Starting background socket service...');

  try {
    const options = {
      taskName: 'BackgroundSocketTask',
      taskTitle: 'Employee Shift Data',
      taskDesc: 'Receive Employee Shift Information',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      parameters: {
        delay: 5000,
      },
    };

    await BackgroundService.start(async taskData => {
      console.log('Background service task started with data:', taskData);
      try {
        await connectToSocketAndCreateRoom(id);
        console.log('Connected to socket and created room successfully.');
      } catch (error) {
        console.error('Error connecting to socket and creating room:', error);
      }
    }, options);

    console.log('Background socket service started successfully!');
  } catch (error) {
    console.error('Failed to start background socket service:', error);
  }
};

const stopBackgroundSocketService = async id => {
  try {
    await BackgroundService.stop();
    console.log('Background socket service stopped successfully!');
  } catch (e) {
    console.error('Failed to stop background socket service:', e);
  }
};

export {startBackgroundSocketService, stopBackgroundSocketService};

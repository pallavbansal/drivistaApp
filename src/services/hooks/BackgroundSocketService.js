import BackgroundService from 'react-native-background-actions';
import io from 'socket.io-client';
import {notificationHandler} from './AndroidNotificationHandler'; // Import your notification handler function

const socket = io('https://drivista.onrender.com');

const connectToSocketAndCreateRoom = id => {
  console.log('WebSocket connected:', id);
  socket.on('connect', () => {
    console.log('WebSocket connected inside:', id);
    socket.emit('create_room', id);
  });
  socket.on('error', error => {
    console.error('Socket connection error:', error);
    // Handle connection error (e.g., display an error message to the user)
  });
  socket.on('notification', notification => {
    console.log('Received notification:', notification);
    // Handle the notification here (e.g., display a notification to the user)
    notificationHandler(notification.event, notification.message, new Date());
  });
};

const startBackgroundSocketService = async id => {
  console.log('WebSocket connected 1:', id);
  try {
    if (BackgroundService.isRunning()) {
      console.log('Background socket service is already running');
      return;
    }

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

    //  await BackgroundService.start(() => {}, options); // Start background service with empty task function
    try {
      await BackgroundService.start(
        taskData => connectToSocketAndCreateRoom(id),
        options,
      );
      console.log('Background location service started successfully!');
    } catch (e) {
      console.error('Failed to start background location service:', e);
    }
    console.log('Background socket service started successfully!');
    // connectToSocketAndCreateRoom(id);
    // setTimeout(() => {
    //   connectToSocketAndCreateRoom(id);
    // }, 2000); // 1 second delay// Connect to socket and create room once background service is started
  } catch (e) {
    console.error('Failed to start background socket service:', e);
  }
};

const stopBackgroundSocketService = async () => {
  try {
    // Disconnect the socket when stopping the background service
    socket.disconnect();
    await BackgroundService.stop();
    console.log('Background socket service stopped successfully!');
  } catch (e) {
    console.error('Failed to stop background socket service:', e);
  }
};

export {startBackgroundSocketService, stopBackgroundSocketService};

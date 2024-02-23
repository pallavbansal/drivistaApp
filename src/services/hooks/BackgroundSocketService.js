import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import {notificationHandler} from './AndroidNotificationHandler';
import {socket} from './WebSocketService';
const connectToSocketAndCreateRoom = async id => {

  console.log('WebSocket connected:', id);
  socket.on('connect', () => {
    console.log('WebSocket connected inside:', id);
    socket.emit('create_room', id);
    socket.emit('store_owner', id);

  });

  socket.on('notification', notification => {
    console.log('Received notification:', notification);
    // Handle the notification here (e.g., display a notification to the user)
    notificationHandler(notification.event, notification.message, new Date());
  });
};

const startBackgroundSocketService = async id => {
  if (BackgroundService.isRunning()) {
    console.log('Background socket service is already running');
    setInterval(() => {
      console.log('Background service is not running.');
      // Handle the case when the background service is not running
      socket.on('notification', notification => {
        console.log('Received notification:', notification);
        // Handle the notification here (e.g., display a notification to the user)
        notificationHandler(notification.event, notification.message, new Date());
      });
    }, 5000);

    return;
  }

  requestBgService(id);
};

const requestBgService = async id => {
  const options = {
    taskName: 'BackgroundLocationTask',
    taskTitle: 'Background Location Task',
    taskDesc: 'Fetches location in the background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 60000, // Adjust the delay as needed
    },
  };

  try {
    await BackgroundService.start(
      taskData => connectToSocketAndCreateRoom(id),
      options,
    );
    console.log('Background location service started successfully!');
  } catch (e) {
    console.error('Failed to start background location service:', e);
  }
};

const stopBackgroundSocketService = async () => {
  try {
    await BackgroundService.stop();
    console.log('Background location service stopped successfully!');
  } catch (e) {
    console.error('Failed to stop background location service:', e);
  }
};

export {startBackgroundSocketService, stopBackgroundSocketService};

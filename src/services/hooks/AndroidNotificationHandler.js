import PushNotification, {Importance} from 'react-native-push-notification';

const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: '1234', // Replace 'channel-id' with your desired channel ID
      channelName: 'My channel', // Replace 'My channel' with your desired channel name
      channelDescription: 'A channel to categorize your notifications',
      playSound: false,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

const notificationHandler = (title, message, date) => {

  PushNotification.localNotificationSchedule({
    channelId: '1234', // Replace 'channel-id' with your desired channel ID
    title: title,
    message: message,
    autoCancel: true,
    subText: 'Notification',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    ignoreInForeground: false,
    importance: 'high',
    invokeApp: true,
    allowWhileIdle: true,
    priority: 'high',
    visibility: 'public',
    date: date,
  });
};

const cancelNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {createChannel, notificationHandler, cancelNotifications};

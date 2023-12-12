import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import {Alert, Linking, PermissionsAndroid} from 'react-native';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const fetchLocationInBackground = async taskDataArguments => {
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      Geolocation.getCurrentPosition(
        position => {
          console.log('Background Location:', position.coords);
          // Send location data to the server or handle it as needed
        },
        error => {
          console.error('Background Location Error:', error);
          if (error.code === 2) {
            // Location services are turned off or unavailable
            console.log('Location services are turned off or unavailable');

            // openSettings(); // Ask the user to open settings to enable location
            //Linking.openSettings();

            //requestLocationPermission();
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          showLocationDialog: true,
          forceRequestLocation: true,
          forceLocationManager: false,
        },
      );
      await sleep(delay);
    }
    resolve();
  });
};
// ... (imports remain unchanged)

const startBackgroundLocationService = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App Location Permission',
        message: 'App needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      // Location permission granted, start the background service
      requestLocationPermission();
    } else {
      console.log('Location permission denied');
      // Handle denied permission (show an alert, etc.)
      Alert.alert(
        'Permission Denied',
        'Location permission is required for this app to function properly.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  } catch (err) {
    console.warn(err);
  }
};


// Rest of the code remains unchanged

const requestLocationPermission = async () => {
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
      delay: 5000, // Adjust the delay as needed
    },
  };


  try {
    await BackgroundService.start(fetchLocationInBackground, options);
    console.log('Background location service started successfully!');
  } catch (e) {
    console.error('Failed to start background location service:', e);
  }
};

const stopBackgroundLocationService = async () => {
  try {
    await BackgroundService.stop();
    console.log('Background location service stopped successfully!');
  } catch (e) {
    console.error('Failed to stop background location service:', e);
  }
};

export {startBackgroundLocationService, stopBackgroundLocationService};

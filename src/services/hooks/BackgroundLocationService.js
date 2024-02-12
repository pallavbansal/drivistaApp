import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import {Alert, Linking, PermissionsAndroid} from 'react-native';
import axios from 'axios';
import baseUrl from '../baseUrl';
import {useDispatch} from 'react-redux';
import {setLocation} from '../../redux/actions/userActions';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));
const sendLocationToServer = async (latitude, longitude, token) => {
  console.log('sendLocationToServer token:', token);
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Add any additional headers required for your API
    },
    body: JSON.stringify({
      latitude,
      longitude,
      // Add any additional data you want to send to the server
    }),
  };
  const response = await fetch(
    'https://e-stat.boxinallsoftech.com/public/api/v1/location/update',
    config,
  );
  try {
    console.log('sendLocationToServer Response Data 2 :', response);
    if (response.ok) {
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      // Handle the response data here
    }
    // Handle the response here, such as checking for success or processing the data
  } catch (error) {
    //   console.error('Fetch Error:', error);
    // Handle any errors that occur during the fetch request
  }
};

const fetchLocationInBackground = async (taskDataArguments, token) => {
  const {delay} = taskDataArguments;
  console.error('Background Location repeat:', token);
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      Geolocation.getCurrentPosition(
        position => {
          console.log('Background Location:', position.coords);
          const {latitude, longitude} = position.coords;
          console.log('Background Location 2:', {latitude, longitude});
          //Alert.alert(latitude.toString());
          //    sendLocationToServer(latitude, longitude, token);
          //   useDispatch(setLocation({latitude, longitude}));
          setTimeout(() => {
            sendLocationToServer(latitude, longitude, token);
          }, 5000);

          // Send location data to the server or handle it as needed
        },
        error => {
          console.error('Background Location Error:', error, ' ', token);
          if (error.code === 2) {
            // const enableResult = promptForEnableLocationIfNeeded({
            //   title: 'Enable Location',
            //   text: 'This app requires location access to function properly.',
            //   positiveButtonText: 'Enable',
            //   negativeButtonText: 'Cancel',
            // });
            // if (enableResult === 'enabled') {
            //   console.log('Location has been enabled.');
            //   // Location is now enabled, perform additional actions if needed
            // } else {
            //   console.log('User denied enabling location.');
            //   // Handle the case where the user denied enabling location
            // }
            // openSettings(); // Ask the user to open settings to enable location
            //Linking.openSettings();
            //requestLocationPermission();
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 10000,
          //  timeout: 30000,
          //  maximumAge: 10000,
          showLocationDialog: true,
          forceRequestLocation: true,
          forceLocationManager: false,
          showsBackgroundLocationIndicator: true,
        },
      );
      await sleep(delay);
    }
    resolve();
  });
};
// ... (imports remain unchanged)

const startBackgroundLocationService = async token => {
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
      requestLocationPermission(token);
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
        {cancelable: false},
      );
    }
  } catch (err) {
    console.warn(err);
  }
};

// Rest of the code remains unchanged

const requestLocationPermission = async token => {
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
    await BackgroundService.start(
      taskData => fetchLocationInBackground(taskData, token),
      options,
    );
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

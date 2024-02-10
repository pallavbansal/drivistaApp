import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';

const useLocationStatus = () => {
  const [isLocationEnabledState, setLocationEnabledState] = useState(true);

  const checkLocationStatus = async () => {
    const locationEnabled = await isLocationEnabled();
    setLocationEnabledState(locationEnabled);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkLocationStatus();
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval
    };
  }, []);

  const requestLocationPermission = async () => {
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
      } else {
        console.log('Location permission denied');
        // Handle denied permission (show an alert, etc.)
      }
    } catch (err) {
      console.log('Error requesting location permission:', err);
    }
  };

  const enableLocationIfNeeded = async () => {
    const enableResult = await promptForEnableLocationIfNeeded({
      title: 'Enable Location',
      text: 'This app requires location access to function properly.',
      positiveButtonText: 'Enable',
      negativeButtonText: 'Cancel',
    });

    if (enableResult === 'enabled') {
      console.log('Location has been enabled.');
    } else {
      console.log('User denied enabling location.');
      // Handle the case where the user denied enabling location
    }
  };

  return {
    isLocationEnabled: isLocationEnabledState,
    requestLocationPermission,
    enableLocationIfNeeded,
  };
};

export default useLocationStatus;

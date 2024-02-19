// import { useEffect } from 'react';
// import { PermissionsAndroid } from 'react-native';
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import BackgroundTask from 'react-native-background-task';

// const useBackgroundLocation = () => {
//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission granted');
//           startBackgroundGeolocation();
//         } else {
//           console.log('Location permission denied');
//           // Handle denied permission
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestLocationPermission();

//     return () => {
//       BackgroundGeolocation.stop();
//       BackgroundTask.finish();
//     };
//   }, []);

//   const startBackgroundGeolocation = () => {
//     BackgroundTask.define(async () => {
//       BackgroundGeolocation.configure({
//         desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//         stationaryRadius: 50,
//         distanceFilter: 50,
//         notificationTitle: 'Background tracking',
//         notificationText: 'enabled',
//         debug: true,
//         startOnBoot: true,
//         stopOnTerminate: false,
//         locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
//         interval: 60000, // 1 minute
//         fastestInterval: 30000, // 30 seconds
//         activitiesInterval: 60000, // 1 minute
//         stopOnStillActivity: false,
//       });

//       BackgroundGeolocation.on('location', async location => {
//         console.log('Background location:', location);
//         // Call your API to send location data to the server
//       });

//       BackgroundGeolocation.start();
//     });

//     BackgroundTask.schedule();
//   };

//   return null; // You can return any values or state you need here
// };

// export default useBackgroundLocation;

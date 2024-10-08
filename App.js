import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import {socket} from './src/services/hooks/WebSocketService';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Pages/Login';
import RegisterScreen from './src/Pages/Register';
import SplashScreen from './src/Pages/Splash';
import StartUpScreen from './src/Pages/StartUp';
import OwnerHomeScreen from './src/Pages/Owners/Owner/Home';
import ProfileScreen from './src/Pages/Profile';
import {PermissionsAndroid, Platform,Linking, Alert} from 'react-native';
import OtpScreen from './src/Pages/Otp';
import ForgotPasswordScreen from './src/Pages/ForgotPassword';
import OnlineDrivers from './src/Pages/Owners/Owner/OnlineDrivers';
import LocationScreen from './src/Pages/Owners/Owner/LocationScreen';
import VehicleHome from './src/Pages/Owners/Vehicle/Home';
import DriverHome from './src/Pages/Owners/Driver/Home';
import SubscriptionScreen from './src/Pages/Owners/Subscription/Home';
import SubscriptionDescription from './src/Pages/Owners/Subscription/SubscriptionDescription';
import EmployeeAdd from './src/Pages/Owners/Subscription/EmployeeAdd';
import PaymentDetails from './src/Pages/Owners/Subscription/PaymentDetails';
import SuccessScreen from './src/Pages/Owners/Subscription/SuccessScreen';
import ReminderScreen from './src/Pages/Owners/Subscription/ReminderScreen';
import VehicleDetails from './src/Pages/Owners/Vehicle/VehicleDetails';
import DriverDetails from './src/Pages/Owners/Driver/DriverDetails';
import CalenderScreen from './src/Pages/Owners/Driver/Calender';
import ChangePassword from './src/Pages/ChangePassword';
import NoInternet from './src/Pages/NoInternet';
import {useSelector} from 'react-redux';
import StartShift from './src/Pages/Drivers/StartShift';
import ActionShift from './src/Pages/Drivers/ActionShift';
import BreakShift from './src/Pages/Drivers/BreakShift';
import WorkHistoryDetails from './src/Pages/Owners/Driver/WorkHistoryDetails';
import NetInfo from '@react-native-community/netinfo';
import {StripeProvider} from '@stripe/stripe-react-native';
import {createChannel} from './src/services/hooks/AndroidNotificationHandler';

const publishableKey =
  'pk_test_51OerSaSBV6gdBMXr5xtVLzH9X77xY9VCyJKaVxHroXamfoPBWaDYkXlxsDspRPLYk4AUDTbtSivvwy6q4M26dswq00NG5ueTyb';
import {
  startBackgroundSocketService,
  stopBackgroundSocketService,
} from './src/services/hooks/BackgroundSocketService';
import {useDriverShiftServiceHook} from './src/services/hooks/shift/useDriverShiftServiceHook';
const App = () => {
  const {isAuth, user} = useSelector(state => state.userState);
  const {current} = useSelector(state => state.shiftState);
  const {caseType} = useSelector(state => state.subscriptionState);
  const {fetchRegularDriversStartShiftRequest} = useDriverShiftServiceHook();
  const options = {
    taskName: 'FetchRegularDriversTask',
    taskTitle: 'Fetching Regular Employees',
    taskDesc: 'Fetching regular employees at regular intervals',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 5 * 60 * 1000, // Interval set to 5 minutes
    },
  };

  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log('Background service task iteration:', i);
        // Call your fetchRegularDriversStartShiftRequest function here
        await fetchRegularDriversStartShiftRequest();
        // Sleep for the specified delay
        await sleep(delay);
      }
      resolve();
    });
  };

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'Allow notifications for regular employees updates?',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
            // Alert.alert("Turn on Your Notification!!");
          //  Linking.openSettings();
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestNotificationPermission();
    const startBackgroundService = async () => {
      try {
        await BackgroundService.start(veryIntensiveTask, options);
        console.log('Background service started successfully!');
      } catch (error) {
        console.error('Failed to start background service:', error);
      }
    };
    if (isAuth && user.parent_id === '-1') {
      startBackgroundService();
    }
    if (!isAuth) {
      BackgroundService.stop();
    }



  }, [isAuth]); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    createChannel(); // Call createChannel when the component mounts
  }, []);
  // useEffect(() => {
  //   if (user && isAuth) {
  //     startBackgroundSocketService('1');
  //   }
  // }, [isAuth]);
  // useEffect(() => {
  //   startBackgroundSocketService('1');
  //   // return () => {
  //   //   stopBackgroundSocketService();
  //   // };
  // }, []);
  useEffect(() => {
    // Establish a socket connection when user is authenticated
    console.log('isAuth value:', isAuth);

    // Listen for 'connect' event
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // Listen for 'notification' event to receive notifications
    socket.on('notification', notification => {
      console.log('Received notification:', notification);
      // Handle the notification here (e.g., display a notification to the user)
    });

    // Clean up the socket connection when the component unmounts or user logs out
    return () => {
      // socket.disconnect();
      socket.off('connect');
    };
  }, []);
  // useEffect(() => {
  //   socket.on('notification', notification => {
  //     console.log('Received notification:', notification);
  //     // Handle the notification here (e.g., display a notification to the user)
  //     notificationHandler(notification.event, notification.message, new Date());
  //   });
  // }, [socket]);
  // useEffect(() => {
  //   let id = '';

  //   if (user && isAuth && user.parent_id === '-1') {
  //     id = user.id;

  //     startBackgroundSocketService(id);
  //   } else if (user && isAuth && user.parent_id !== '-1') {
  //     id = user.parent_id;
  //     //  startBackgroundSocketService(id);
  //   }
  // }, [isAuth, user]);

  useEffect(() => {
    // Listen for the shiftNotification event
    // socket.on('connect', () => {
    //   console.log('WebSocket connected in app js');
    // });
    // socket.on('notification', notification => {
    //   console.log('Received shift notification:', notification);
    //   //   handleNotification();
    //   notificationHandler(notification.event, notification.message, new Date());
    //   // Handle the notification (e.g., display it to the owner)
    // });
    // return () => {
    //   // Clean up event listener
    //   socket.off('notification');
    // };
  }, []);
  const Stack = createNativeStackNavigator();
  let initialScreen;
  const [isConnected, setIsConnected] = useState(null);
  const handleConnectionChange = state => {
    setIsConnected(state.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
    };

    checkConnection();
  }, []);

  if (isConnected === null) {
    return null; // Loading spinner or another loading indicator
  }

  if (user.role === '2' && isAuth && current) {
    initialScreen =
      current.current_status === 'started' ? 'ActionShift' : 'StartShift';
  } else if (user.role == 1 && isAuth) {
//    console.log('in app initialScreen:', isAuth ," ",user.role);
    initialScreen = 'OwnerHomeScreen';
  }

  console.log('in app:', isAuth ," ",user.role);
  const currentStatus = current ? current.current_status : null;

  if (!isConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="NoInternet" component={NoInternet} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialScreen}
          screenOptions={{
            headerShown: false,
          }}>
          {isAuth && user.role == 2 ? (
            <>
              {currentStatus === 'started' ? (
                <>
                  <Stack.Screen name="ActionShift" component={ActionShift} />
                </>
              ) : currentStatus === 'break' ? (
                <>
                  <Stack.Screen name="BreakShift" component={BreakShift} />
                </>
              ) : (
                <>
                  <Stack.Screen name="StartShift" component={StartShift} />
                </>
              )}
            </>
          ) : isAuth && user.role == 1 ? (
            <>
              <Stack.Screen
                name="OwnerHomeScreen"
                component={OwnerHomeScreen}
              />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

              <Stack.Screen name="EmployeeAdd" component={EmployeeAdd} />
              <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
              <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
              <Stack.Screen name="OnlineDrivers" component={OnlineDrivers} />
              <Stack.Screen name="LocationScreen" component={LocationScreen} />
              <Stack.Screen name="VehicleHome" component={VehicleHome} />
              <Stack.Screen name="DriverHome" component={DriverHome} />
              <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
              <Stack.Screen name="CalenderScreen" component={CalenderScreen} />

              <Stack.Screen
                name="WorkHistoryDetails"
                component={WorkHistoryDetails}
              />
              <Stack.Screen name="DriverDetails" component={DriverDetails} />
              <Stack.Screen name="ReminderScreen" component={ReminderScreen} />

              <Stack.Screen name="StartShift" component={StartShift} />
              <Stack.Screen name="BreakShift" component={BreakShift} />
              <Stack.Screen name="ActionShift" component={ActionShift} />
              {caseType === 'suscribe_as' ? (
                <Stack.Screen
                  name="SubscriptionScreen"
                  component={SubscriptionScreen}
                />
              ) : null}

              <Stack.Screen
                name="SubscriptionDescription"
                component={SubscriptionDescription}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="StartUp" component={StartUpScreen} />

              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />
            </>
          )}

          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import moment from 'moment';
import BackgroundContainer from '../../components/reusableComponents/Container/BackgroundContainer';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {Fonts} from '../../constants/fonts';
import {globalStyles} from '../../constants/globalStyles';
import actionshiftbg from '../../storage/images/actionshiftbg.png';
import shiftbg from '../../storage/images/shiftbg.png';
import themeLogo from '../../storage/images/theme.png';
import journey from '../../storage/images/journey.png';
import CustomButton from '../../components/reusableComponents/CustomButton';
import {useDriverShiftServiceHook} from '../../services/hooks/shift/useDriverShiftServiceHook';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthServiceHook} from '../../services/hooks/auth/useAuthServiceHook';
import {
  setIncrementTimer,
  setStartBreakTime,
} from '../../redux/actions/userActions';
import {
  startBackgroundLocationService,
  stopBackgroundLocationService,
} from '../../services/hooks/BackgroundLocationService';
// import {isLocationEnabled} from 'react-native-android-location-enabler';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import Spinner from '../../components/reusableComponents/Spinner';
import Alert from '../../components/reusableComponents/Alert';
import useLocationStatus from '../../services/hooks/useLocationStatus';

const ActionShift = ({navigation}) => {
  const {token} = useSelector(state => state.userState);
  const {current} = useSelector(state => state.shiftState);
  const {isLocationEnabled,enableLocationIfNeeded} = useLocationStatus();

  const {
    loading,
    setLoading,
    showAlert,
    closeAlert,
    handleOK,
    alertVisible,
    alertMessage,
    endShiftRequest,
    currentShiftRequest,
    startEndBreakShiftRequest,
  } = useDriverShiftServiceHook();
  const {logoutRequest} = useAuthServiceHook();
  const [time, setTime] = useState('');
  const [breaksNo, setBreaksNo] = useState(0);
  const [promptOpen, setPromptOpen] = useState(false);
  const dispatch = useDispatch();
  const labels = {
    label: 'Take a break',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    email: 'Email Id',
    password: 'Password',
    buttonLabel1: 'Take a break',
    buttonLabel2: 'End Shift',
    navigateScreen: 'OwnerHomeScreen',
    footerNavigateScreen: 'RegisterScreen',
    navigateBackScreen: 'LoginScreen',
    navigateBackNavigation: navigation => navigation.pop(),
    // handleEndShiftNavigation: navigation => navigation.pop(),
    handleEndShiftNavigation: async screenName => {
      console.log('what is screen:', screenName);
      setLoading(true);
      const response = await endShiftRequest();
      //  logoutRequest();
      setLoading(false);
      try {
        if (response.result === 'success') {
          stopBackgroundService();
          navigation.navigate('StartShift');
        } else if (response.result === 'failed') {
          showAlert(response.message);
        } else {
          navigation.navigate(screenName);
        }
      } catch (error) {
        console.error('action error:', error);
      }
    },
    handleBreakNavigation: async screenName => {
      console.log('what is screen:', screenName);
      setLoading(true);
      const startBreakTime = moment().format('YYYY-MM-DD HH:mm:ss');
      dispatch(setStartBreakTime(startBreakTime));
      const response = await startEndBreakShiftRequest();

      dispatch(setIncrementTimer(0));
      setLoading(false);
      try {
        if (response.result === 'success') {
          navigation.navigate('BreakShift');
        } else if (response.result === 'failed') {
          showAlert(response.message);
        } else {
          navigation.navigate(screenName);
        }
      } catch (error) {
        console.error('action error:', error);
      }
    },
    // handleBreakNavigation: () => navigation.navigate('BreakShift'),
  };
  const handleEndShiftNavigationLogout = async screenName => {
    console.log('what is screen:', screenName);
    setLoading(true);
    const response = await endShiftRequest();
    await stopBackgroundService();
    await logoutRequest();

    setLoading(false);
    try {
      if (response.result === 'success') {
        stopBackgroundService();
      } else if (response.result === 'failed') {
        showAlert(response.message);
      } else {
        navigation.navigate(screenName);
      }
    } catch (error) {
      console.error('action error:', error);
    }
  };
  const startBackgroundService = async () => {
    await startBackgroundLocationService(token);
    // setIsServiceRunning(true);
  };

  async function handleCheckPressed() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      console.log('checkEnabled', checkEnabled, ' ', promptOpen);
      if (!checkEnabled) {
        setPromptOpen(!promptOpen);
        requestLocationPermission();
      }
    }
  }
  // useEffect(() => {
  //   startBackgroundService();
  //   if (!isLocationEnabled) {
  //     repeatedlyCheckPermission();
  //   }
  //   console.log('check location:',isLocationEnabled);
  //   //  requestLocationPermission();
  // }, [isLocationEnabled]);
  useEffect(() => {
    const startServiceAndCheckPermission = async () => {
      // Start your background service
      startBackgroundService();

      // Check if location permission is granted
      const permissionGranted = await checkLocationPermission();
      console.log('check location:', permissionGranted, ' ', isLocationEnabled);
      // If permission is not granted and location is not enabled, repeatedly check permission
      if (!permissionGranted && isLocationEnabled) {
        repeatedlyCheckPermission();
      }
      else if (!isLocationEnabled) {
      //  enableLocationIfNeeded();
        checkLocationEnabledPermission();
      }
    };

    startServiceAndCheckPermission();
  }, [isLocationEnabled]);
  const checkBackgroundServiceStatus = async () => {
    try {
      const isServiceRunning = await BackgroundService.isRunning();
      console.log('Background Service is running:', isServiceRunning);
      if (!isServiceRunning) {
        showAlert('allowwww');
      }
    } catch (error) {
      console.error('Error checking background service status:', error);
    }
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     checkBackgroundServiceStatus();
  //   }, 5000); // Delay of 10 seconds
  //   return () => clearTimeout(timer);
  // }, []);
  const checkLocationEnabledPermission = async () => {
    try {
      const enableResult = await promptForEnableLocationIfNeeded({
        title: 'Enable Location',
        text: 'This app requires location access to function properly.',
        positiveButtonText: 'Enable',
        negativeButtonText: 'Cancel',
      });

      if (!enableResult) {
        // User chose to cancel enabling location services
        return false;
      }
      return true; // Location services enabled
    } catch (err) {
      checkLocationEnabledPermission();
     // console.warn('Error checking location permission:', err);
     // return false;
    }
  };


  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
      );


        if (!granted) {
          // User chose to cancel enabling location services
          return false;
        }
      return granted;
    } catch (err) {
      console.warn('Error checking location permission:', err);

    }
  };

  const requestLocationPermission = async () => {
    try {
      const backgroundPermissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'App Location Permission',
          message: 'App needs access to your location for better functionality.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
     console.log("backgroundPermissionGranted:",backgroundPermissionGranted);
      // If background location permission is not granted, return false
      if (backgroundPermissionGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      } else {
        return false; // Permission not granted
      }
    } catch (err) {
      console.warn('Error requesting location permission:', err);
      return false;
    }
  };

  const repeatedlyCheckPermission = async () => {
    let permissionGranted = await checkLocationPermission();

    while (!permissionGranted) {
      showAlert(
        'Enable "Allow all the time" Background Location Permission',
        'This app needs access to your location for better functionality.',
        [
          {
            text: 'OK',
            onPress: async () => {
              const requested = await requestLocationPermission();
              if (requested) {
                permissionGranted = true;
              }
              else{
                repeatedlyCheckPermission();
              }
            },
          },
        ],
        {cancelable: false},
      );

      await new Promise(resolve => setTimeout(resolve, 3000)); // Check every 3 seconds
      permissionGranted = await checkLocationPermission(); // Check permission again
    }

    console.log('Location permission granted');
    // Start your background service here
  };

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'App Location Permission',
  //         message: 'App needs access to your location.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Location permission granted');
  //       startBackgroundService();
  //       // Location permission granted, start the background service
  //     } else {
  //       console.log('Location permission denied !!');
  //       // Handle denied permission (show an alert, etc.)
  //       Linking.openSettings();
  //       // showAlert(
  //       //   'Permission Denied',
  //       //   'Location permission is required for this app to function properly.',
  //       //   [
  //       //     {
  //       //       text: 'OK',
  //       //       onPress: () => {
  //       //         Linking.openSettings();
  //       //       },
  //       //       style: 'cancel',
  //       //     },
  //       //   ],
  //       //   { cancelable: false },
  //       // );
  //     }
  //   } catch (err) {
  //     console.warn('Error requesting location permission:', err);
  //   }
  // };
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if(!promptOpen)
  //     {
  //       handleCheckPressed();
  //     }

  //   }, 3000);

  //   // Clean up the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, []);

  const stopBackgroundService = async () => {
    await stopBackgroundLocationService();
    // setIsServiceRunning(true);
  };

  useEffect(() => {
    currentShiftRequest();
  }, []);

  useEffect(() => {
    if (current) {
      setTime(formatShiftTime());
      setBreaksNo(current.number_of_breaks);
    }
  }, [current]);

  function formatShiftTime() {
    const parsedDate = new Date(current.shift_start_time);

    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    // Format the time
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${hours < 12 ? 'AM' : 'PM'}`;

    return formattedTime;
  }
  const navigationPopUpList = [
    {
      label: 'logout',
      navigateScreen: 'logout',
    },
  ];
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };
  return (
    <BackgroundContainer source={themeLogo}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        showPopUp={true}
        showBackArrow={false}
        containerStyle={styles.headContainer}
        navigationPopUpList={navigationPopUpList}
        modalStyle={{height: 40, marginTop: 20}}
        handleNavigation={navigateScreen => {
          if (navigateScreen === 'logout') {
            handleEndShiftNavigationLogout(labels.navigateScreen);
            // logoutRequest();
          }
          console.log('handleNavigation bb:', navigateScreen);
        }}
        handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
      />
      {/* <Text>Location is {isLocationEnabled ? 'enabled' : 'disabled'}</Text> */}
      <CardContainer
        labels={labels}
        current={current}
        formatShiftTime={time}
        breaksNo={breaksNo}
      />
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
      />
    </BackgroundContainer>
  );
};

const ButtonContainer = memo(props => (
  <TouchableOpacity style={styles.button}>
    <CustomButton {...props} disabled={props.isFormValid} />
  </TouchableOpacity>
));
const CardContainer = props => (
  <ImageBackground source={actionshiftbg} style={styles.imageBackground}>
    <View style={styles.mainContainer}>
      <View style={styles.headingLabel}>
        <Text style={styles.textHead}>{props.formatShiftTime}</Text>
        <Text style={styles.textSubHead}>
          {'Total breaks : '}
          {props.breaksNo}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={{flex: 1}}>
          <ButtonContainer
            layout="2"
            handleNavigation={props.labels.handleBreakNavigation}
            buttonLabel={props.labels.buttonLabel1}
            // {...props.labels}
          />
          <ButtonContainer
            layout="2"
            handleNavigation={props.labels.handleEndShiftNavigation}
            buttonLabel={props.labels.buttonLabel2}
            // {...props.labels}
          />
        </View>
      </View>
    </View>
  </ImageBackground>
);
const styles = StyleSheet.create({
  headContainer: {
    flex: 0.1,
  },
  mainContainer: {
    flex: 0.9,
    alignItems: 'center',
  },
  headingLabel: {
    flex: 0.7,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 0.3,
    width: '70%',
    justifyContent: 'space-evenly',
  },
  imageBackground: {
    flex: 0.7,
    resizeMode: 'cover',
    marginHorizontal: 20,
  },
  textHead: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: '900',
    opacity: 0.9,
  },
  textSubHead: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    opacity: 0.7,
    marginTop: 50,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ActionShift);

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';
import moment from 'moment';
import BackgroundContainer from '../../components/reusableComponents/Container/BackgroundContainer';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import actionshiftbg from '../../storage/images/actionshiftbg.png';
import themeLogo from '../../storage/images/theme.png';
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
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import Spinner from '../../components/reusableComponents/Spinner';
import AlertDialog from '../../components/reusableComponents/Alert';
import useLocationStatus from '../../services/hooks/useLocationStatus';

const ActionShift = ({navigation}) => {
  const {token} = useSelector(state => state.userState);
  const {current} = useSelector(state => state.shiftState);
  const {isLocationEnabled, enableLocationIfNeeded} = useLocationStatus();

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
    handleEndShiftNavigation: async screenName => {
      console.log('what is screen:', screenName);
      setLoading(true);
      const response = await endShiftRequest();
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

  const requestGeoLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, // Add this for background location access
        ],
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location in order to function properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_BACKGROUND_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Error requesting location permission:', err);
      return false;
    }
  };
  const getCurrentPositionWithPermission = async () => {
    const hasPermission = await requestGeoLocationPermission();

    if (!hasPermission) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log(
          //   'Position found:',
          //   position.coords.latitude,
          //   position.coords.longitude,
          // );
          // Handle position data
        },
        error => {
          Alert.alert('Oops!', error.message, [
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]);
          console.log(error.message);
          // Handle error
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: false,
          timeout: 6000,
          // maximumAge: 000,
          distanceFilter: 0,
          forceRequestLocation: true,
          forceLocationManager: false,
          showLocationDialog: true,
        },
      );
    }
  };

  useEffect(() => {
    getCurrentPositionWithPermission();
  }, []);
  useEffect(() => {
    const startServiceAndCheckPermission = async () => {
      // Start your background service
      // startBackgroundService();

      // Check if location permission is granted
      const permissionGranted = await checkLocationPermission();
      console.log('check location:', permissionGranted, ' ', isLocationEnabled);
      // If permission is not granted and location is not enabled, repeatedly check permission
      if (!permissionGranted && isLocationEnabled) {
        //  repeatedlyCheckPermission();
      } else if (!isLocationEnabled) {
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
    }
  };

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
      console.log('checkLocationPermission permission:', granted);
      if (!granted) {
        // User chose to cancel enabling location services
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Error checking location permission:', err);
    }
  };
  useEffect(() => {
    const checkLocationPermissionAndStartService = async () => {
      let permissionGranted = await checkLocationPermission();

      if (permissionGranted) {
        startBackgroundService();
      } else {
        console.log('Location permission denied');
        permissionGranted = await checkLocationPermission();
      }
    };
    const intervalId = setInterval(
      checkLocationPermissionAndStartService,
      5000,
    );
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const stopBackgroundService = async () => {
    await stopBackgroundLocationService();
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
          }
          console.log('handleNavigation bb:', navigateScreen);
        }}
        handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
      />
      <CardContainer
        labels={labels}
        current={current}
        formatShiftTime={time}
        breaksNo={breaksNo}
      />
      <AlertDialog
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
          />
          <ButtonContainer
            layout="2"
            handleNavigation={props.labels.handleEndShiftNavigation}
            buttonLabel={props.labels.buttonLabel2}
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

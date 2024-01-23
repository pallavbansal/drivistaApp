/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
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
import {setIncrementTimer} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthServiceHook} from '../../services/hooks/auth/useAuthServiceHook';

const BreakShift = ({navigation}) => {
  const {loading, setLoading, startEndBreakShiftRequest} =
    useDriverShiftServiceHook();
  const {logoutRequest} = useAuthServiceHook();
  const {time} = useSelector(state => state.shiftState);
  const dispatch = useDispatch();
  const labels = {
    label: 'Take a break',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    buttonLabel: 'End break',
    navigateScreen: 'OwnerHomeScreen',
    footerNavigateScreen: 'RegisterScreen',
    navigateBackScreen: 'LoginScreen',
    navigateBackNavigation: navigation => navigation.pop(),
    handleDirectNavigation: (navigation, screenName) =>
      navigation.navigate(screenName),

    handleBreakNavigation: async screenName => {
      console.log('what is screen:', screenName);

      const response = await startEndBreakShiftRequest();

      try {
        if (response.result === 'success') {
          navigation.navigate('ActionShift');
        } else if (response.result === 'failed') {
          Alert.alert(response.message);
        } else {
          navigation.navigate(screenName);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  };
//  const [timer, setTimer] = useState(0);
const [timer, setTimer] = useState(0);

// Function to update the timer
const updateTimer = () => {
  setTimer(prevTimer => prevTimer + 1);
};


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimer(prevTime => prevTime + 1);
  //     // dispatch(setIncrementTimer());
  //   }, 1000);

  //   // Clear interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);
  const startServices = () => {
  //  startBackgroundLocationService(); // Start background location service

    // Schedule the timer update function to run every second
    const timerInterval = BackgroundTimer.setInterval(updateTimer, 1000);

    // Save the interval ID to clear it later
    return timerInterval;
  };

  // Stop the background location service and clear the timer interval
  const stopServices = timerInterval => {
   // stopBackgroundLocationService(); // Stop background location service
    BackgroundTimer.clearInterval(timerInterval); // Clear the timer interval
  };

  useEffect(() => {
    let timerInterval;

    // Initialize BackgroundTimer when the component mounts
    BackgroundTimer.start();

    // Start services when the component mounts
    timerInterval = startServices();

    // Clean up when the component unmounts
    return () => {
      stopServices(timerInterval);
      // Stop BackgroundTimer when the component unmounts
      BackgroundTimer.stop();
    };
  }, []);
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
  };
  const navigationPopUpList = [
    {
      label: 'logout',
      navigateScreen: 'logout',
    },
  ];
  return (
    <BackgroundContainer source={themeLogo}>
      <HeaderContainer
        labels={labels}
        showPopUp={true}
        showBackArrow={false}
        containerStyle={styles.headContainer}
        handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
        navigationPopUpList={navigationPopUpList}
        modalStyle={{height: 40, marginTop: 20}}
        handleNavigation={navigateScreen => {
          if (navigateScreen === 'logout') {
            logoutRequest();
          }
          console.log('handleNavigation bb:', navigateScreen);
        }}
      />
      <CardContainer labels={labels} formatTime={formatTime} time={timer} />
    </BackgroundContainer>
  );
};

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} disabled={props.isFormValid} />
  </View>
));
const CardContainer = props => (
  <ImageBackground source={actionshiftbg} style={styles.imageBackground}>
    <View style={styles.mainContainer}>
      <View style={styles.headingLabel}>
        <Text style={styles.textHead}>{props.formatTime(props.time)}</Text>
      </View>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={{flex: 1}}>
          <ButtonContainer
            layout="2"
            handleNavigation={props.labels.handleBreakNavigation}
            buttonLabel={props.labels.buttonLabel1}
            {...props.labels}
          />
        </View>
      </TouchableOpacity>
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

export default memo(BreakShift);

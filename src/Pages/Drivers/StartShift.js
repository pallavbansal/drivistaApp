/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import BackgroundContainer from '../../components/reusableComponents/Container/BackgroundContainer';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {Fonts} from '../../constants/fonts';
import {globalStyles} from '../../constants/globalStyles';
import shiftbg from '../../storage/images/shiftbg.png';
import themeLogo from '../../storage/images/theme.png';
import journey from '../../storage/images/journey.png';
import {useDriverShiftServiceHook} from '../../services/hooks/shift/useDriverShiftServiceHook';
import {useAuthServiceHook} from '../../services/hooks/auth/useAuthServiceHook';
import {
  startBackgroundLocationService,
  stopBackgroundLocationService,
} from '../../services/hooks/BackgroundLocationService.js';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import Spinner from '../../components/reusableComponents/Spinner';

const StartShift = ({navigation}) => {
  const {loading, setLoading, startShiftRequest} = useDriverShiftServiceHook();

  const {logoutRequest} = useAuthServiceHook();
  const labels = {
    label: 'Please click on the start button to start your shift',
    navigateScreen: 'ActionShift',
    navigateBackNavigation: navigation => navigation.pop(),
    //   handleNavigation: (screenName) => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      console.log('what is screen:', screenName);
      setLoading(true);
      requestLocationPermission();
      const response = await startShiftRequest();

      setLoading(false);
      try {
        if (response.result === 'success') {
          console.log('response bb:', response.id);
          navigation.navigate(screenName);
          // navigation.navigate(screenName, {
          //   caseType: 'register',
          //   id: response.id,
          // });
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
  const handleNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    }
  };
  const navigationPopUpList = [
    {
      label: 'logout',
      navigateScreen: 'logout',
    },
  ];

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
        const enableResult =await promptForEnableLocationIfNeeded({
          title: 'Enable Location',
          text: 'This app requires location access to function properly.',
          positiveButtonText: 'Enable',
          negativeButtonText: 'Cancel',
        });

        if (enableResult === 'enabled') {
          console.log('Location has been enabled.');
          startBackgroundService();

          // Location is now enabled, perform additional actions if needed
        }
        else {
          console.log('User denied enabling location.');
          startBackgroundService();
          // Handle the case where the user denied enabling location
        }

        // Location permission granted, start the background service

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
     // console.warn(err);
     requestLocationPermission();
      console.log('User selected "No Thanks". Handle accordingly.');
    }
  };

  const startBackgroundService = async () => {
    await startBackgroundLocationService();
    // setIsServiceRunning(true);
  };
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
        handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
        modalStyle={{height: 40, marginTop: 20}}
        handleNavigation={navigateScreen => {
          if (navigateScreen === 'logout') {
            logoutRequest();
          }
          console.log('handleNavigation bb:', navigateScreen);
        }}
      />

      <CardContainer labels={labels} />
    </BackgroundContainer>
  );
};
const CardContainer = props => (
  <View style={styles.mainContainer}>
    <View style={styles.headingLabel}>
      <Text style={[styles.text,{fontSize:22}]}>
        {props.labels.label}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => props.labels.handleNavigation(props.labels.navigateScreen)}
      style={styles.cardContainer}>
      <ImageBackground source={shiftbg} style={styles.imageBackground}>
        <View style={styles.logoSection}>
          <Image
            source={journey}
            style={[globalStyles.logoImage, {width: 80, height: 80}]}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  headContainer: {
    flex: 0.1,
  },
  mainContainer: {
    flex: 0.9,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  headingLabel: {
    flex: 0.5,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:5
  },
  cardContainer: {
    flex: 0.5,
    width: '70%',
    justifyContent: 'flex-start',
    marginTop: -40,
  },
  imageBackground: {
    flex: 0.5,
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: -30,
  },
});

export default memo(StartShift);

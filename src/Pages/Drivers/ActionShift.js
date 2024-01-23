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
import { useSelector } from 'react-redux';
import { useAuthServiceHook } from '../../services/hooks/auth/useAuthServiceHook';


const ActionShift = ({navigation}) => {
  const {current} = useSelector(state => state.shiftState);
  const {loading, setLoading, endShiftRequest,currentShiftRequest,startEndBreakShiftRequest} = useDriverShiftServiceHook();
  const {logoutRequest} = useAuthServiceHook();
  const [time,setTime]=useState("");
  const [breaksNo,setBreaksNo]=useState(0);
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
      setLoading(false);
      try {
        if (response.result === 'success') {
          navigation.navigate('StartShift');
        } else if (response.result === 'failed') {
          Alert.alert(response.message);
        } else {
          navigation.navigate(screenName);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    handleBreakNavigation: async screenName => {
      console.log('what is screen:', screenName);
      setLoading(true);
      const response = await startEndBreakShiftRequest();
      setLoading(false);
      try {
        if (response.result === 'success') {
          navigation.navigate('BreakShift');
        } else if (response.result === 'failed') {
          Alert.alert(response.message);
        } else {
          navigation.navigate(screenName);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
   // handleBreakNavigation: () => navigation.navigate('BreakShift'),
  };

  useEffect(()=>{
    currentShiftRequest();
  },[]);

  useEffect(()=>{
    setTime(formatShiftTime());
    setBreaksNo(current.number_of_breaks);
  },[current]);

  function formatShiftTime() {
    const parsedDate = new Date(current.shift_start_time);

    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    // Format the time
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours < 12 ? 'AM' : 'PM'}`;

    return formattedTime;
  }
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
        navigationPopUpList={navigationPopUpList}
        modalStyle={{height: 40, marginTop: 20}}
        handleNavigation={navigateScreen => {
          if (navigateScreen === 'logout') {
            logoutRequest();
          }
          console.log('handleNavigation bb:', navigateScreen);
        }}
        handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
      />
      <CardContainer labels={labels} current={current} formatShiftTime={time} breaksNo={breaksNo}/>
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
        <Text style={styles.textSubHead}>{'Total breaks : '}{props.breaksNo}</Text>
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

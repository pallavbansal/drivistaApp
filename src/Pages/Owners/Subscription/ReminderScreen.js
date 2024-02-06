/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import reminder from '../../../storage/images/reminder.png';
import {globalStyles} from '../../../constants/globalStyles';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {Fonts} from '../../../constants/fonts';
import LogoWithLabel from '../../../components/reusableComponents/LogoWithLabel';
import {useSubscriptionServiceHook} from '../../../services/hooks/subscription/useSubscriptionServiceHook';
import { useSelector } from 'react-redux';

const ReminderScreen = ({navigation}) => {
  const {subscription} = useSelector(state => state.subscriptionState);
  let heading;
if (subscription.remaining_days === "") {
    heading = "Your free trial has expired.";
} else {
    heading = `Your free trial ends in ${subscription.remaining_days} days.`;
}

  const {loading, setLoading, fetchSubscriptionDataRequest} =
    useSubscriptionServiceHook();
    useEffect(()=>{
      const response=fetchSubscriptionDataRequest();
    },[])
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const props = {
    label: heading,
    heading: heading,
    subHeading:
      'We hope you were able to spend the last two weeks exploring how E-State can help you save your time and track your employees!.',
    email: 'Email Id',
    buttonLabel: 'OK',
    text1:
      'We hope you were able to spend the last two weeks exploring how E-State can help you save your time and track your employees!',
    text2:heading+'To keep using our features, please subscribe to one of our paid plan.',
    navigateScreen: 'SubscriptionScreen',
    handleNavigation: (screenName, isModal) => {
      if (!isModal) {
        // Navigate to the SubscriptionDescription screen
        navigation.navigate(screenName);
      } else {
        // Open modal or perform other actions
        setIsConfirmationModalVisible(!isConfirmationModalVisible); // Set modal visibility to true
        // Perform other actions as needed
      }
    },
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <View style={styles.logoContainer}>
        <LogoWithLabel
          logo={reminder}
          label={props.heading}
          width={150}
          height={150}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <DescriptionContainer {...props} text={props.text1} />
        <DescriptionContainer {...props} text={props.text2} />
        {/* <DescriptionContainer {...props} text={props.text2} /> */}
      </View>
      <View style={styles.footerContainer}>
        <CustomButton {...props} />
      </View>
    </MainContainer>
  );
};
const DescriptionContainer = memo(({text}) => {
  const highlightSaveYourTime = 'save your time';
  const highlightTrackYourEmployees = 'track your employees';
  const highlightTrialEnd = 'Your free trial ends in 3 days.';

  const parts = text.split(
    new RegExp(
      `(${highlightSaveYourTime}|${highlightTrackYourEmployees}|${highlightTrialEnd})`,
      'gi',
    ),
  );

  return (
    <View style={styles.header}>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.small, fontWeight: 'bold'},
        ]}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightSaveYourTime ? (
            <Text key={index} style={{color: '#FB8700'}}>
              {part}
            </Text>
          ) : part.toLowerCase() === highlightTrackYourEmployees ? (
            <Text key={index} style={{color: '#FB8700'}}>
              {part}
            </Text>
          ) : part.toLowerCase() === highlightTrialEnd ? (
            <Text key={index} style={{color: '#FB8700'}}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          ),
        )}
      </Text>
    </View>
  );
});

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 40,
  },

  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  descriptionContainer: {
    flex: 0.2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0.4,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '50%',
    marginLeft: 60,
  },
  header: {
    flexDirection: 'row',
  },

  // buttonContainer: {
  //   width: 300,
  // },
  // button:{
  //   flex:1,
  //   justifyContent:'center',
  //   alignItems:'center',
  //   backgroundColor:'red',

  //   // width:'50%'

  // }
});

export default memo(ReminderScreen);

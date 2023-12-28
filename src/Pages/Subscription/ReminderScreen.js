/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import reminder from '../../storage/images/reminder.png';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import InfoCard from '../../components/reusableComponents/InfoCard';
import Heading from '../../components/reusableComponents/Heading';
import CustomButton from '../../components/reusableComponents/CustomButton';
import {fonts} from 'react-native-elements/dist/config';
import {Fonts} from '../../constants/fonts';
import Space from '../../components/reusableComponents/Space';
import LogoWithLabel from '../../components/reusableComponents/LogoWithLabel';
import ModalView from '../../components/reusableComponents/ModalView';

const ReminderScreen = ({navigation}) => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const props = {
    label: 'Your free trial ends in 3 days',
    heading: 'Your free trial ends in 3 days',
    subHeading:
      'We hope you were able to spend the last two weeks exploring how E-State can help you save your time and track your employees!.',
    email: 'Email Id',
    buttonLabel: 'OK',
    text1:
      'We hope you were able to spend the last two weeks exploring how E-State can help you save your time and track your employees!',
    text2:
      'To keep using our features, please subscribe to one of our paid plan.',
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
        <LogoWithLabel logo={reminder} label={props.heading} />
      </View>
      <View style={styles.descriptionContainer}>
        <DescriptionContainer {...props} text={props.text1} />
        <DescriptionContainer {...props} text={props.text2} />
      </View>
      <View style={styles.footerContainer}>
        <ButtonContainer {...props} />
      </View>
    </MainContainer>
  );
};
const DescriptionContainer = memo(({heading, text}) => (
  <View style={styles.header}>
    <Text
      style={[
        globalStyles.text,
        {fontSize: Fonts.sizes.small, fontWeight: 'bold'},
      ]}>
      {heading}
      {'.'}
      {text}
    </Text>
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 20,
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
    justifyContent:'center'
  },
});

export default memo(ReminderScreen);

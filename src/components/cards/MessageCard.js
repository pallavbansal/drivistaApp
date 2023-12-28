import React, {memo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import cancel from '../../storage/images/cancel.png';
import {Colors} from '../../constants/colors';
import LogoWithLabel from '../reusableComponents/LogoWithLabel';
import Heading from '../reusableComponents/Heading';
import CustomButton from '../reusableComponents/CustomButton';

const MessageCard = ({label, description, handleNavigation}) => {
  const props = {
    label: 'Forgot Password',
    heading: 'How many employees do you have?',
    email: 'Email Id',
    buttonLabel: 'Yes',
    linkText: 'Resend OTP',
    //  navigateScreen: 'PaymentDetails',
    // handleNavigation: screenName => navigation.navigate(screenName),
  };



  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.logoContainer}>
          <LogoWithLabel label={label} logo={cancel} />
        </View>

        <View style={styles.mixButtonContainer}>

          <ButtonContainer {...props}   navigateScreen={'CancelMessageModal'} handleNavigation={handleNavigation} buttonLabel="Back to home" />
        </View>
      </View>
    </View>
  );
};
const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));
const styles = StyleSheet.create({
  centeredView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // height:400,
    // marginTop:100
  },
  modalView: {
    // marginLeft: 'auto',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    marginHorizontal: 10,

    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  heading: {
    flex: 0.1,
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mixButtonContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1, // Each button should take equal space
    marginHorizontal: 5, // Adjust horizontal spacing between buttons
  },
});

export default MessageCard;

import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import accessDenied from '../../storage/images/accessDenied.png';
import LogoWithLabel from '../reusableComponents/LogoWithLabel';
import CustomButton from '../reusableComponents/CustomButton';

const MessageCard = ({label, description, handleNavigation}) => {
  const props = {
    label: 'Forgot Password',
    heading: 'How many employees do you have?',
    email: 'Email Id',
    buttonLabel: 'Yes',
    linkText: 'Resend OTP',

  };



  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.logoContainer}>
          <LogoWithLabel label={label} logo={accessDenied} headsize={20} width={80} height={80}  />
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

  },
  modalView: {

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
    marginHorizontal:20
  },
  button: {
    flex: 1, // Each button should take equal space
    marginHorizontal: 5, // Adjust horizontal spacing between buttons
  },
});

export default MessageCard;

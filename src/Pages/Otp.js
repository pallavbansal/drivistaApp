/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';
import CustomButton from '../components/reusableComponents/CustomButton';
import themeLogo from '../storage/images/theme.png';
import Heading from '../components/reusableComponents/Heading';
import PageLabel from '../components/reusableComponents/PageLabel';
import AuthFooter from '../components/reusableComponents/Footer/AuthFooter';
import OtpInput from '../components/reusableComponents/OtpInput';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';

const Otp = ({navigation}) => {
  const props = {
    label: 'Enter OTP',
    heading: 'Please enter the 4-digit code sent to your e-mail address.',
    email: 'Email Id',
    buttonLabel: 'Submit',
    password: 'Password',
    authFooterText: 'Do not have an account?',
    linkText: 'register',
    navigateScreen: 'OwnerHomeScreen',
    handleNavigation: () => navigation.navigate('OwnerHomeScreen'),
  };

  const handleOtpComplete = otpValue => {
    console.log('Completed OTP:', otpValue);
    // Handle the completed OTP value here, e.g., validation or submission
  };

  return (
    <BackgroundContainer
    source={themeLogo}
  >
    <View style={styles.mainContainer}>
      <View style={styles.pageLabel}>
        <PageLabel label={props.label} />
      </View>
      <View style={styles.container}>
        <HeadingContainer heading={props.heading} />
        <OtpInput length={4} onComplete={handleOtpComplete} />
        <ButtonContainer {...props} />
      </View>
    </View>
    </BackgroundContainer>
  );
};

const HeadingContainer = memo(({heading}) => (
  <View style={styles.header}>
    <Heading label={heading} />
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));

const FooterContainer = memo(props => (
  <View style={styles.footer}>
    <AuthFooter text={props.authFooterText} navigationText={props.linkText} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  pageLabel: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
    backgroundColor: Colors.inputWrapperBg,
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: Colors.inputWrapperBg,
  },
  footer: {
    flex: 0.3,
  },
  button: {
    flex: 0.3,
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default memo(Otp);

/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';
import CustomButton from '../components/reusableComponents/CustomButton';
import CustomTextInput from '../components/reusableComponents/CustomTextInput';
import emailLogo from '../storage/images/email.png';
import lockLogo from '../storage/images/lock.png';
import Heading from '../components/reusableComponents/Heading';
import PageLabel from '../components/reusableComponents/PageLabel';
import AuthFooter from '../components/reusableComponents/Footer/AuthFooter';
import Checkbox from '../components/reusableComponents/Checkbox';
import Space from '../components/reusableComponents/Space';

const Register = () => {
  const props = {
    label: 'Registration',
    heading:
      'Fill up the following details.',
    email: 'Email Id',
    buttonLabel:'Sign Up',
    authFooterText: 'Already have an Account?',
    linkText: 'signin',
    fullName:'Full Name',
    lastName:'Last Name',
    mobileNumber:'Mobile Number',
    password: 'Password',
    confirmPassword:"Confirm Password",
    checkboxText:"Start your 15 days trial"
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pageLabel}>
        <PageLabel label={props.label} />
      </View>
      <View style={styles.container}>
        <HeadingContainer heading={props.heading} />
        <InputContainer {...props} />
        <ButtonContainer {...props} />
        <FooterContainer {...props} />
      </View>
    </View>
  );
};

const HeadingContainer = memo(({heading}) => (
  <View style={styles.header}>
    <Heading label={heading} />
  </View>
));

const InputContainer = memo((props) => (
  <View style={styles.inputContainer}>
    <CustomTextInput
      logoName={emailLogo}
      placeholder={props.fullName}
    />
    <CustomTextInput
      logoName={emailLogo}
      placeholder={props.lastName}
    />
    <CustomTextInput
      logoName={emailLogo}
      placeholder={props.email}
      showPasswordText={false}
    />
     <CustomTextInput
      logoName={emailLogo}
      placeholder={props.mobileNumber}
    />
    <CustomTextInput
      logoName={lockLogo}
      placeholder={props.password}
      showPasswordText={true}
    />
      <CustomTextInput
      logoName={lockLogo}
      placeholder={props.confirmPassword}
      showPasswordText={true}
    />
    <Space />
    <Checkbox label={props.checkboxText}/>
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
    backgroundColor: Colors.primary,
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
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: Colors.inputWrapperBg,
  },
  footer: {
    flex: 0.1,
  },
  button: {
    flex: 0.1,
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default memo(Register);

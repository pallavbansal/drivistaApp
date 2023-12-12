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

const Login = ({navigation}) => {
  const props = {
    label: 'Login',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    email: 'Email Id',
    buttonLabel:'Login',
    password: 'Password',
    authFooterText: 'Do not have an account?',
    linkText: 'register',
    navigateScreen:'OwnerHomeScreen',
    handleNavigation:()=> navigation.navigate('OwnerHomeScreen')
  };
  const handleNavigation=(navigateScreen)=>{
    navigation.navigate(navigateScreen);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pageLabel}>
        <PageLabel label={props.label} />
      </View>
      <View style={styles.container}>
        <HeadingContainer heading={props.heading} />
        <InputContainer email={props.email} password={props.password} />
        <ButtonContainer {...props}  />
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

const InputContainer = memo(({email, password}) => (
  <View style={styles.inputContainer}>
    <CustomTextInput
      logoName={emailLogo}
      placeholder={email}
      showPasswordText={false}
    />
    <CustomTextInput
      logoName={lockLogo}
      placeholder={password}
      showPasswordText={true}
    />
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props}  />
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

export default memo(Login);

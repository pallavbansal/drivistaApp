/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Text,TouchableOpacity,Alert} from 'react-native';
import {Colors} from '../constants/colors';
import CustomButton from '../components/reusableComponents/CustomButton';
import CustomTextInput from '../components/reusableComponents/CustomTextInput';
import emailLogo from '../storage/images/email.png';
import lockLogo from '../storage/images/lock.png';
import Heading from '../components/reusableComponents/Heading';
import PageLabel from '../components/reusableComponents/PageLabel';
import AuthFooter from '../components/reusableComponents/Footer/AuthFooter';
import themeLogo from '../storage/images/theme.png';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import { useAuthServiceHook } from '../services/hooks/auth/useAuthServiceHook';

const ForgotPassword = ({navigation}) => {
  const { loading,setEmail,email,
    setLoading,forgotPasswordRequest} =
    useAuthServiceHook();
  const labels = {
    label: 'Forgot Password',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    email: 'Email Id',
    buttonLabel: 'Send OTP',
    password: 'Password',
    authFooterText: '',
    linkText: 'Resend OTP',
    navigateScreen: 'OtpScreen',
    // handleNavigation: (screenName) => navigation.navigate(screenName),
    handleNavigation: async screenName => {
   //   const response = await loginRequest();
   setLoading(true);
   const response = await forgotPasswordRequest();
   setLoading(false);
   try {
     if (response.result === 'success') {
      navigation.navigate(screenName, {caseType:'forgot_password',id: response.id});
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

  return (
    <BackgroundContainer
      source={themeLogo}
    >
    <View style={styles.mainContainer}>
    <HeaderContainer
          showPopUp={false}
          showBackArrow={true}
          containerStyle={styles.headContainer}
        />
      <View style={styles.pageLabel}>
        <PageLabel label={labels.label} />
      </View>
      <View style={styles.container}>
        <HeadingContainer heading={labels.heading} />
        <InputContainer labels={labels} email={email}    setEmail={setEmail} />
        <ButtonContainer {...labels} />
        <FooterContainer {...labels} />
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

const InputContainer = memo((props) => (
  <View style={styles.inputContainer}>
    <CustomTextInput
      logoName={emailLogo}
      onChangeText={text => props.setEmail(text)}
      placeholder={props.labels.email}
      showPasswordText={false}
    />

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
  headContainer: {
    flex: 0.1,
  },
  pageLabel: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 0.5,
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
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: Colors.inputWrapperBg,
  },
  forgetPassword: {
    alignItems: 'flex-end',
    marginTop: -20,
    marginBottom: 10,
  },
  footer: {
    flex: 0.2,
    justifyContent:'center'
  },
  button: {
    flex: 0.2,
    // justifyContent:'center'
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default memo(ForgotPassword);

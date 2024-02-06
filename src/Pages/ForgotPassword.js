/* eslint-disable prettier/prettier */
import React, {memo, useEffect,useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
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
import {useAuthServiceHook} from '../services/hooks/auth/useAuthServiceHook';
import {Fonts} from '../constants/fonts';
import {globalStyles} from '../constants/globalStyles';
import Space from '../components/reusableComponents/Space';
import Alert from '../components/reusableComponents/Alert';

const ForgotPassword = ({navigation}) => {
  const {
    loading,
    setEmail,
    email,
    isFormValid,
    loginError,
    setLoginError,
    setIsFormValid,
    setLoading,
    alertVisible,
    alertMessage,
    showAlert,
    closeAlert,
    handleOK,
    forgotPasswordRequest,
  } = useAuthServiceHook();
  const [showResend,setShowResend]=useState("");
  const labels = {
    label: 'Forgot Password',
    heading: 'Enter the e-mail address associated with your account.',
    email: 'Email Id',
    buttonLabel: 'Send OTP',
    password: 'Password',
    authFooterText: '',
    linkText: 'Resend OTP',
    navigateScreen: 'OtpScreen',
    footerNavigateScreen: 'OtpScreen',
    navigateBackScreen: 'LoginScreen',
    handleDirectNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {

      //   const response = await loginRequest();
      setLoading(true);
      const response = await forgotPasswordRequest();

      setLoading(false);
      try {
        if (response.result === 'success') {
          navigation.navigate(screenName, {
            caseType: 'forgot_password',
            id: response.id,
          });
        } else if (response.result === 'failed') {
          setShowResend(true);
          showAlert(response.message);
        } else {
          navigation.navigate(screenName);
        }
      } catch (error) {
        setShowResend(true);
        console.error('Login error:', error);
      }
    },
  };
  const checkFormValidity = () => {
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailValidationRegex.test(email);

    const isValid = isEmailValid;
    const errorCheck = {
      email: !isEmailValid ? 'Email should contain @ and .com' : '',
    };

    setLoginError({
      ...loginError,
      email: errorCheck.email,
    });

    setIsFormValid(!isValid);
  };
  useEffect(() => {
    checkFormValidity(); // Check validity on input change
  }, [email]);
  return (
    <BackgroundContainer source={themeLogo}>
      <View style={styles.mainContainer}>
        <HeaderContainer
          showPopUp={false}
          labels={labels}
          showBackArrow={true}
          containerStyle={styles.headContainer}
          handleBackNavigation={labels.handleDirectNavigation}
        />
        <View style={styles.pageLabel}></View>
        <View style={styles.container}>
          <Text
            style={[
              globalStyles.labelHeading,
              {color: 'black', fontWeight: 'bold', fontSize: 20},
            ]}>
            {labels.label}
          </Text>
          <Space />
          <HeadingContainer heading={labels.heading} />
          <InputContainer
            labels={labels}
            email={email}
            setEmail={setEmail}
            loginError={loginError}
          />
          <ButtonContainer {...labels} isFormValid={isFormValid} />

          {/* <ResendButtonContainer {...labels} buttonLabel={labels.linkText} /> */}
          <FooterContainer {...labels} isFormValid={isFormValid} showResend={showResend} />
        </View>
      </View>
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
      />
    </BackgroundContainer>
  );
};

const HeadingContainer = memo(({heading}) => (
  <View style={styles.header}>
    <Heading label={heading} />
  </View>
));

const InputContainer = memo(props => (
  <View style={styles.inputContainer}>
    <CustomTextInput
      logoName={emailLogo}
      errorText={props.email.length > 0 ? props.loginError.email : ''}
      onChangeText={text => props.setEmail(text)}
      placeholder={props.labels.email}
      showPasswordText={false}
    />
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} disabled={props.isFormValid} />
  </View>
));

const ResendButtonContainer = memo(props => (
  <View style={styles.resendButton}>
    <CustomButton {...props} />
  </View>
));

const FooterContainer = memo(props => (
  <TouchableOpacity
    disabled={props.isFormValid}
    style={styles.footer}
    onPress={() => {
      props.handleNavigation(props.navigateScreen);
    }}>
      {
        props.showResend ? (
          <Text style={styles.navigationLinkText}> {props.linkText}</Text>
        ):""
      }

  </TouchableOpacity>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headContainer: {
    flex: 0.1,
  },
  pageLabel: {
    flex: 0.1,
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
    flex: 0.3,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 0.2,
    marginTop: -10,
  },
  resendButton: {
    flex: 0.2,
    // alignItems:'center',
    justifyContent: 'center',
    // width:200,

    // margin:'auto',
    // marginLeft:'50%',
    // marginRight:'50%',
    //  width:'60%',
    backgroundColor: 'red',
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  navigationLinkText: {
    fontSize: 16,
    fontWeight: Fonts.weight.bold,
    color: Colors.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default memo(ForgotPassword);

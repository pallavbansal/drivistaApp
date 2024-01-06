/* eslint-disable prettier/prettier */
import React, {memo, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
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
import useAuthService from '../hooks/useAuthService';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import {useAuthServiceHook} from '../services/hooks/auth/useAuthServiceHook';
import Spinner from '../components/reusableComponents/Spinner';

const Register = ({navigation}) => {
  const {
    loading,
    setLoading,
    loginError,
    setLoginError,
    fullName,
    setFullName,
    isFormValid,
    setIsFormValid,
    lastName,
    setLastName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isTrialChecked,
    setIsTrialChecked,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    errors,
    registrationRequest,
  } = useAuthServiceHook();
  const labels = {
    label: 'Registration',
    heading: 'Fill up the following details.',
    email: 'Email Id',
    buttonLabel: 'Sign Up',
    authFooterText: 'Already have an Account?',
    linkText: 'Sign In',
    fullName: 'First Name',
    lastName: 'Last Name',
    mobileNumber: 'Mobile Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    checkboxText: 'Start your 15 days trial',
    footerNavigateScreen: 'LoginScreen',
    navigateScreen: 'OtpScreen',
    navigateBackScreen:'LoginScreen',
    handleDirectNavigation: screenName => navigation.pop(),
    handleNavigation: async screenName => {
      console.log('what is screen:', screenName);
      setLoading(true);
      const response = await registrationRequest();
      setLoading(false);
      try {
        if (response === 'verfication_failed') {
          Alert.alert('Verfication failed');
        } else if (response.result === 'success') {
          console.log('response bb:', response.id);
          navigation.navigate(screenName, {
            caseType: 'register',
            id: response.id,
          });
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
  const checkFormValidity = () => {
    const isFirstNameValid = fullName.length >= 3;
    const isLastNameValid = lastName.length >= 3;
    const isMobileNumberValid = mobileNumber.length >= 10;
    const isPasswordValid = password.length > 5; // Ensure password length is greater than 6
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailValidationRegex.test(email);
    const isConfirmPasswordValid =
      confirmPassword.length > 0 && confirmPassword === password;

    const errorCheck = {
      fullName:
        !isFirstNameValid && fullName !== ''
          ? 'First Name length should be atleast 3'
          : '',
      lastName:
        !isLastNameValid && lastName !== ''
          ? 'Last Name length should be atleast 3'
          : '',
      email:
        !isEmailValid && email !== '' ? 'Email should contain @ and .com' : '',
      mobileNumber:
        !isMobileNumberValid && mobileNumber !== ''
          ? 'Mobile Number should be atleast 10 letters'
          : '',
      password:
        !isPasswordValid && password !== ''
          ? 'Password should be of atleast length six '
          : '',
      confirmPassword:
        !isConfirmPasswordValid && confirmPassword !== ''
          ? 'Confirm Password should match New Password'
          : '',
    };
    const isValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isMobileNumberValid &&
      isPasswordValid &&
      isConfirmPasswordValid;
    setLoginError({
      ...loginError,
      fullName: errorCheck.fullName,
      lastName:errorCheck.lastName,
      email: errorCheck.email,
      mobileNumber: errorCheck.mobileNumber,
      password: errorCheck.password,
      confirmPassword: errorCheck.confirmPassword,
    });

    setIsFormValid(!isValid);
  };

  useEffect(() => {
    checkFormValidity(); // Check validity on input change
  }, [fullName, lastName, mobileNumber, password, confirmPassword, email]);

  console.log('check first name:', fullName);

  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };
  return (
    <View style={styles.mainContainer}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        showBackArrow={true}
        containerStyle={styles.headContainer}
        handleBackNavigation={labels.handleDirectNavigation}
      />
      <View style={styles.pageLabel}>
        <PageLabel label={labels.label} />
      </View>
      <ScrollView style={{flex: 0.9}}>
        <View style={styles.container}>
          <Space />
          <HeadingContainer heading={labels.heading} />
          <InputContainer
            labels={labels}
            fullName={fullName}
            loginError={loginError}
            setFullName={setFullName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            checkboxText={labels.checkboxText}
            isTrialChecked={isTrialChecked}
            setIsTrialChecked={setIsTrialChecked}
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
            confirmPasswordVisible={confirmPasswordVisible}
            setConfirmPasswordVisible={setConfirmPasswordVisible}
            errors={errors}
            {...labels}
          />
          <ButtonContainer {...labels} isFormValid={isFormValid} />
          <FooterContainer {...labels} />
        </View>
      </ScrollView>
    </View>
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
      errorText={props.loginError.fullName}
      placeholder={props.labels.fullName}
      onChangeText={text => {
        props.setFullName(text);
      }}
    />
    <CustomTextInput
      logoName={emailLogo}
      errorText={props.loginError.lastName}
      placeholder={props.labels.lastName}
      onChangeText={text => props.setLastName(text)}
    />
    <CustomTextInput
      logoName={emailLogo}
      errorText={props.loginError.email}
      placeholder={props.labels.email}
      showPasswordGenIcon={false}
      onChangeText={text => props.setEmail(text)}
    />
    <CustomTextInput
      logoName={emailLogo}
      errorText={props.loginError.mobileNumber}
      placeholder={props.labels.mobileNumber}
      onChangeText={text => props.setMobileNumber(text)}
    />
    <CustomTextInput
      logoName={lockLogo}
      errorText={props.loginError.password}
      placeholder={props.labels.password}
      showPasswordGenIcon={true}
      passwordVisible={props.passwordVisible}
      handlePasswordVisiblity={() => {
        props.setPasswordVisible(!props.passwordVisible);
      }}
      onChangeText={text => props.setPassword(text)}
    />
    <CustomTextInput
      logoName={lockLogo}
      errorText={props.loginError.confirmPassword}
      placeholder={props.labels.confirmPassword}
      showPasswordGenIcon={true}
      passwordVisible={props.confirmPasswordVisible}
      handlePasswordVisiblity={() => {
        props.setConfirmPasswordVisible(!props.confirmPasswordVisible);
      }}
      onChangeText={text => props.setConfirmPassword(text)}
    />

    <Space />
    <Checkbox label={props.checkboxText} />
  </View>
));
const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} disabled={props.isFormValid} />
  </View>
));

const FooterContainer = memo(props => (
  <View style={styles.footer}>
    <AuthFooter
      {...props}
      text={props.authFooterText}
      navigationText={props.linkText}
    />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
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
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
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
    justifyContent: 'flex-start',
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

/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
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
    fullName,
    setFullName,
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
    fullName: 'Full Name',
    lastName: 'Last Name',
    mobileNumber: 'Mobile Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    checkboxText: 'Start your 15 days trial',
    footerNavigateScreen: 'LoginScreen',
    navigateScreen: 'OtpScreen',
    handleDirectNavigation: screenName => navigation.navigate(screenName),
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
          navigation.navigate(screenName, {caseType:'register',id: response.id});
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
        showBackArrow={true}
        containerStyle={styles.headContainer}
      />
      <View style={styles.pageLabel}>
        <PageLabel label={labels.label} />
      </View>
      <View style={styles.container}>
        <HeadingContainer heading={labels.heading} />
        <InputContainer
          labels={labels}
          fullName={fullName}
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
        <ButtonContainer {...labels} />
        <FooterContainer {...labels} />
      </View>
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
      placeholder={props.labels.fullName}
      onChangeText={text => {
        props.setFullName(text);
      }}
    />
    <CustomTextInput
      logoName={emailLogo}
      placeholder={props.labels.lastName}
      onChangeText={text => props.setLastName(text)}
    />
    <CustomTextInput
      logoName={emailLogo}
      placeholder={props.labels.email}
      showPasswordGenIcon={false}
      onChangeText={text => props.setEmail(text)}
    />
    <CustomTextInput
      logoName={emailLogo}
      placeholder={props.labels.mobileNumber}
      onChangeText={text => props.setMobileNumber(text)}
    />
    <CustomTextInput
      logoName={lockLogo}
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
    <CustomButton {...props} />
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
    flex: 0.8,
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

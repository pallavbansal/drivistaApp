/* eslint-disable prettier/prettier */
import React, {memo, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {Colors} from '../constants/colors';
import CustomButton from '../components/reusableComponents/CustomButton';
import CustomTextInput from '../components/reusableComponents/CustomTextInput';
import emailLogo from '../storage/images/email.png';
import lockLogo from '../storage/images/lock.png';
import Heading from '../components/reusableComponents/Heading';
import PageLabel from '../components/reusableComponents/PageLabel';
import AuthFooter from '../components/reusableComponents/Footer/AuthFooter';
import {globalStyles} from '../constants/globalStyles';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import {useAuthServiceHook} from '../services/hooks/auth/useAuthServiceHook';
import Spinner from '../components/reusableComponents/Spinner';

const Login = ({navigation}) => {
  const {
    loading,
    setLoading,
    setEmail,
    email,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    loginRequest,
  } = useAuthServiceHook();

  const labels = {
    label: 'Login',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    email: 'Email Id',
    buttonLabel: 'Login',
    password: 'Password',
    authFooterText: 'Do not have an account?',
    linkText: 'Register',
    navigateScreen: 'OwnerHomeScreen',
    footerNavigateScreen: 'RegisterScreen',
    handleDirectNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      setLoading(true);
      const response = await loginRequest();
      setLoading(false);
      try {
        if (response.result === 'verfication_failed') {
          Alert.alert('Please validate fields!');
        } else if (response.result === 'success') {
          navigation.navigate(screenName);
        } else if (response.result === 'failed') {
          Alert.alert('Credentials Invalid');
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
        showPopUp={false}
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
          email={email}
          setEmail={setEmail}
          setPasssword={setPassword}
          password={password}
          passwordVisible={passwordVisible}
          setPasswordVisible={setPasswordVisible}
        />
        <ForgetPasswordContainer {...labels} />
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
      onChangeText={text => props.setEmail(text)}
      placeholder={props.labels.email}
    />
    <CustomTextInput
      logoName={lockLogo}
      onChangeText={text => props.setPasssword(text)}
      passwordVisible={props.passwordVisible}
      handlePasswordVisiblity={() => {
        props.setPasswordVisible(!props.passwordVisible);
      }}
      placeholder={props.labels.password}
      showPasswordGenIcon={true}
    />
  </View>
));
const ForgetPasswordContainer = memo(props => (
  <TouchableOpacity
    onPress={() => props.handleDirectNavigation('ForgotPasswordScreen')}>
    <View style={styles.forgetPassword}>
      <Text style={[globalStyles.text]}>Forget password?</Text>
    </View>
  </TouchableOpacity>
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
    flex: 0.7,
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
  forgetPassword: {
    alignItems: 'flex-end',
    marginTop: -20,
    marginBottom: 10,
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  button: {
    flex: 0.3,
    justifyContent: 'center',
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default memo(Login);

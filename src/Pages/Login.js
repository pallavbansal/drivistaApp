/* eslint-disable prettier/prettier */
import React, {memo, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
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
import Space from '../components/reusableComponents/Space';
import Alert from '../components/reusableComponents/Alert';

const Login = ({navigation, route}) => {
  const {type} = route.params;
  const {
    loading,
    setLoading,
    setEmail,
    email,
    password,
    loginError,
    setLoginError,
    setPassword,
    passwordVisible,
    isFormValid,
    setIsFormValid,
    setPasswordVisible,
    alertVisible,
    alertMessage,
    showAlert,
    closeAlert,
    handleOK,
    loginRequest,
  } = useAuthServiceHook();

  const labels = {
    label: 'Login',
    heading:'Please enter your valid email address ',
    email: 'Email Id',
    buttonLabel: 'Login',
    password: 'Password',
    authFooterText: type === 'Owner Login' ? 'Do not have an account?' : '',
    linkText: type === 'Owner Login' ? 'Register' : '',
    navigateScreen: 'StartShift',
    footerNavigateScreen: 'RegisterScreen',
    navigateBackScreen: 'LoginScreen',
    navigateBackNavigation: () => navigation.pop(),
    handleDirectNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      setLoading(true);
      const response = await loginRequest();
      setLoading(false);
      try {
        if (response.result === 'verfication_failed') {
          showAlert('Please validate fields!');
        } else if (response.result === 'success') {
          if (response.role === '1') {
            navigation.navigate('OwnerHomeScreen');
          } else if (response.role === '2') {
            navigation.navigate('StartShift');
          }
          // navigation.navigate(screenName);
        } else if (response.result === 'failed') {
          showAlert('Credentials Invalid');
        } else {
        }
      } catch (error) {
        showAlert('No internet connection!');
        //console.error('Login error:', error);
      }
    },
  };

  const checkFormValidity = () => {
    const isPasswordValid = password.length > 5; // Ensure password length is greater than 5
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailValidationRegex.test(email);

    const isValid = isPasswordValid && isEmailValid;
    const errorCheck = {
      email: !isEmailValid ? 'Email should contain @ and .com' : '',
      password: !isPasswordValid
        ? 'Password should be of atleast length six '
        : '',
    };
    setLoginError({
      ...loginError,
      email: errorCheck.email,
      password: errorCheck.password,
    });

    setIsFormValid(!isValid);
  };

  useEffect(() => {
    checkFormValidity(); // Check validity on input change
  }, [password, email]);
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };

  const HeadingContainer = memo(({heading}) => (
    <View style={styles.header}>
      <Heading label={heading} color={Colors.primary} />
    </View>
  ));
  
  return (
    <View style={styles.mainContainer}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        showPopUp={false}
        showBackArrow={true}
        containerStyle={styles.headContainer}
        handleBackNavigation={labels.navigateBackNavigation}
      />
      <View style={styles.pageLabel}>
        <PageLabel label={labels.label} />
      </View>
      <Space/>
      <View style={styles.container}>
          <Space/>
        <HeadingContainer heading={labels.heading} />
          <Space/>
          <Space />
        <InputContainer
          labels={labels}
          loginError={loginError}
          email={email}
          setEmail={setEmail}
          setPasssword={setPassword}
          password={password}
          passwordVisible={passwordVisible}
          setPasswordVisible={setPasswordVisible}
        />
        <Space/>
        {
          type === "Owner Login" ? <ForgetPasswordContainer {...labels} /> : <Text style={{color: 'gray',marginTop:50,textAlign:'center'}} >{"In case you forgot your user name/password please contact your supervisor"}</Text>
        }
        <ButtonContainer {...labels} isFormValid={isFormValid} />
        <FooterContainer {...labels} />
      </View>
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
      />
    </View>
  );
};

const InputContainer = memo(props => (
  <View style={styles.inputContainer}>
    <CustomTextInput
      logoName={emailLogo}
      errorText={props.email.length > 0 ? props.loginError.email : ''}
      onChangeText={text => props.setEmail(text)}
      placeholder={props.labels.email}
    />
    <CustomTextInput
      logoName={lockLogo}
      errorText={props.password.length > 0 ? props.loginError.password : ''}
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
  headContainer: {},
  pageLabel: {
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -20,
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
    paddingTop: 20,
    // marginBottom: 20,
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

export default Login;

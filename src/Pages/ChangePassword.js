/* eslint-disable prettier/prettier */
import React, {memo, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../constants/colors';
import CustomButton from '../components/reusableComponents/CustomButton';
import CustomTextInput from '../components/reusableComponents/CustomTextInput';
import lockLogo from '../storage/images/lock.png';
import themeLogo from '../storage/images/theme.png';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';
import Space from '../components/reusableComponents/Space';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import {useAuthServiceHook} from '../services/hooks/auth/useAuthServiceHook';
import Spinner from '../components/reusableComponents/Spinner';
import {globalStyles} from '../constants/globalStyles';
import Alert from '../components/reusableComponents/Alert';

const ChangePassword = ({navigation, route}) => {
  const {caseType, id, verification_uid} = route.params;
  const {
    loading,
    setLoading,
    loginError,
    setLoginError,
    oldPassword,
    setOldPassword,
    password,
    setPassword,
    setConfirmPassword,
    confirmPassword,
    passwordVisible,
    setPasswordVisible,
    isFormValid,
    setIsFormValid,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    alertVisible,
    alertMessage,
    showAlert,
    closeAlert,
    handleOK,
    changePasswordRequest,
    changePasswordProfileRequest,
  } = useAuthServiceHook();
  const labels = {
    label: 'Change Password',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    oldPassword: 'old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    buttonLabel: 'Submit',
    navigateScreen: 'OtpScreen',
    handleDirectNavigation: screenName => navigation.pop(),
    handleNavigation: async screenName => {
      setLoading(true);
      if (caseType === 'register') {
        const response = await changePasswordRequest(id, verification_uid);
        setLoading(false);
        try {
          if (response.result === 'success') {
            navigation.navigate('LoginScreen');
          } else if (response.result === 'failed') {
            showAlert(response.message);
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      } else if (caseType === 'profile') {
        const response = await changePasswordProfileRequest();
        setLoading(false);
        try {
          if (response.result === 'success') {
            navigation.navigate('ProfileScreen');
          } else if (response.result === 'failed') {
            showAlert(response.message);
          }
        } catch (error) {
          console.error('change password error:', error);
        }
      }
    },
  };

  const checkFormValidity = () => {
    const isOldPasswordValid = oldPassword.length > 5;
    const isNewPasswordValid = password.length > 5; // Ensure password length is greater than 6
    const isConfirmPasswordValid =
      confirmPassword.length > 0 && confirmPassword === password;

    const isValid = isNewPasswordValid && isConfirmPasswordValid;
    const errorCheck = {
      oldPassword:
        !isOldPasswordValid && oldPassword !== ''
          ? 'Password should be of atleast length six'
          : '',
      password:
        !isNewPasswordValid && password !== ''
          ? 'Password should be of atleast length six'
          : '',
      confirmPassword:
        !isConfirmPasswordValid && confirmPassword !== ''
          ? 'Confirm Password should match New Password'
          : '',
    };

    setLoginError({
      ...loginError,
      oldPassword: errorCheck.oldPassword,
      password: errorCheck.password,
      confirmPassword: errorCheck.confirmPassword,
    });
    setIsFormValid(!isValid);
  };

  useEffect(() => {
    checkFormValidity(); // Check validity on input change
  }, [oldPassword, password, confirmPassword]);

  console.log('conform pass:', confirmPassword);
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };
  return (
    <BackgroundContainer source={themeLogo}>
      {renderSpinner()}
      <View style={styles.mainContainer}>
        <HeaderContainer
          showPopUp={false}
          labels={labels}
          showBackArrow={true}
          containerStyle={styles.headContainer}
          handleBackNavigation={labels.handleDirectNavigation}
        />

        <View style={styles.container}>
          <Text
            style={[
              globalStyles.labelHeading,
              {color: Colors.primary, fontSize: 20, fontWeight: 'bold'},
            ]}>
            {'Change Password'}
          </Text>
          <InputContainer
            loginError={loginError}
            labels={labels}
            caseType={caseType}
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
            confirmPasswordVisible={confirmPasswordVisible}
            setConfirmPasswordVisible={setConfirmPasswordVisible}
            {...labels}
          />
          <Space />
          <ButtonContainer isFormValid={isFormValid} {...labels} />
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

const InputContainer = memo(props => (
  <View style={styles.inputContainer}>
    {props.caseType === 'profile' ? (
      <CustomTextInput
        logoName={lockLogo}
        errorText={props.loginError.oldPassword}
        placeholder={props.labels.oldPassword}
        showPasswordGenIcon={false}
        passwordVisible={props.passwordVisible}
        handlePasswordVisiblity={() => {
          props.setPasswordVisible(!props.passwordVisible);
        }}
        onChangeText={text => props.setOldPassword(text)}
      />
    ) : (
      ''
    )}

    <CustomTextInput
      logoName={lockLogo}
      placeholder={props.labels.newPassword}
      errorText={props.loginError.password}
      showPasswordGenIcon={false}
      passwordVisible={props.passwordVisible}
      handlePasswordVisiblity={() => {
        props.setPasswordVisible(!props.passwordVisible);
      }}
      onChangeText={text => props.setPassword(text)}
    />
    <CustomTextInput
      logoName={lockLogo}
      placeholder={props.labels.confirmPassword}
      errorText={props.loginError.confirmPassword}
      showPasswordGenIcon={false}
      passwordVisible={props.confirmPasswordVisible}
      handlePasswordVisiblity={() => {
        props.setConfirmPasswordVisible(!props.confirmPasswordVisible);
      }}
      onChangeText={text => props.setConfirmPassword(text)}
    />
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} disabled={props.isFormValid} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headContainer: {
    flex: 0.2,
  },
  pageLabel: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    flexDirection: 'column',
    backgroundColor: Colors.inputWrapperBg,
    marginVertical: 10,
  },
  forgetPassword: {
    alignItems: 'flex-end',
    marginTop: -20,
    marginBottom: 10,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  button: {
    flex: 0.2,
    marginHorizontal: 40,
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default memo(ChangePassword);

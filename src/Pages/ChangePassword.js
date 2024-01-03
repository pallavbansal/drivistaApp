/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
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
import Space from '../components/reusableComponents/Space';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import {useAuthServiceHook} from '../services/hooks/auth/useAuthServiceHook';
import Spinner from '../components/reusableComponents/Spinner';

const ChangePassword = ({navigation, route}) => {
  const {caseType, id, verification_uid} = route.params;
  const {
    loading,
    setLoading,
    oldPassword,
    setOldPassword,
    password,
    setPassword,
    setConfirmPassword,
    confirmPassword,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    changePasswordRequest,
    changePasswordProfileRequest
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
    // handleNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      setLoading(true);
      if (caseType === 'register') {
        const response = await changePasswordRequest(id, verification_uid);
        setLoading(false);
        try {
          if (response.result === 'success') {
            navigation.navigate('LoginScreen');
          } else if (response.result === 'failed') {
            Alert.alert(response.message);
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
            Alert.alert(response.message);
          }
        } catch (error) {
          console.error('Login error:', error);
        }
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
    <BackgroundContainer source={themeLogo}>
      {renderSpinner()}
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
          {/* <InputContainer email={props.oldPassword} password={props.password} /> */}
          <InputContainer
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
          <ButtonContainer {...labels} />
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

const InputContainer = memo(props => (
  <View style={styles.inputContainer}>
    {props.caseType === 'profile' ? (
      <CustomTextInput
        logoName={lockLogo}
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
    // justifyContent:'center'
  },
  actionSection: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default memo(ChangePassword);

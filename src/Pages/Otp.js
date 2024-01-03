/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet,Alert} from 'react-native';
import {Colors} from '../constants/colors';
import CustomButton from '../components/reusableComponents/CustomButton';
import themeLogo from '../storage/images/theme.png';
import Heading from '../components/reusableComponents/Heading';
import PageLabel from '../components/reusableComponents/PageLabel';
import AuthFooter from '../components/reusableComponents/Footer/AuthFooter';
import OtpInput from '../components/reusableComponents/OtpInput';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import { useAuthServiceHook } from '../services/hooks/auth/useAuthServiceHook';
import Spinner from '../components/reusableComponents/Spinner';

const Otp = ({navigation,route}) => {
  const {id,caseType}=route.params;

  const { loading,
    setLoading,otp,setOtp,otpVerifyRequest,otpForgotPassVerifyRequest} =
    useAuthServiceHook();
  const labels = {
    label: 'Enter OTP',
    heading: 'Please enter the 4-digit code sent to your e-mail address.',
    email: 'Email Id',
    buttonLabel: 'Submit',
    password: 'Password',
    authFooterText: 'Do not have an account?',
    linkText: 'register',
    navigateScreen: 'OwnerHomeScreen',
    // handleNavigation: () => navigation.navigate('OwnerHomeScreen'),
    handleNavigation: async screenName => {
      if(caseType === "register")
      {
        setLoading(true);
        const response = await otpVerifyRequest(id);
        setLoading(false);

        try {
        if (response.result === 'success') {
         // navigation.navigate(screenName);
        } else if (response.result === 'failed') {
          console.log('otp screwn:',response.message);
          Alert.alert(response.message);
        }
        // else{
        //   navigation.navigate(screenName);
        // }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
    if(caseType === "forgot_password")
    {
      setLoading(true);
      const response = await otpForgotPassVerifyRequest(id);
      setLoading(false);

      try {
      if (response.result === 'success') {
       navigation.navigate("ChangePassword",{caseType:'register',id: response.id,verification_uid:response.verification_uid});
      } else if (response.result === 'failed') {
        console.log('otp screwn:',response.message);
        Alert.alert(response.message);
      }
      // else{
      //   navigation.navigate(screenName);
      // }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

    },
  };

  const handleOtpComplete = otpValue => {
    console.log('Completed OTP:', otpValue);
    setOtp(otpValue);
    // Handle the completed OTP value here, e.g., validation or submission
  };

  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };

  return (
    <BackgroundContainer
    source={themeLogo}
  >
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
        <OtpInput length={4} setOtp={setOtp} otp={otp} onComplete={handleOtpComplete} />
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
    paddingHorizontal: 40,
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

export default memo(Otp);

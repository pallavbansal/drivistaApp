/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import bucket from '../../../storage/images/bucket.png';
import plus from '../../../storage/images/plus.png';
import minus from '../../../storage/images/minus.png';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {Fonts} from '../../../constants/fonts';
import Space from '../../../components/reusableComponents/Space';
import LogoWithLabel from '../../../components/reusableComponents/LogoWithLabel';

const EmployeeAdd = ({navigation}) => {
  const props = {
    label: 'Forgot Password',
    heading: 'How many employees do you have?',
    email: 'Email Id',
    buttonLabel: 'Next',
    linkText: 'Resend OTP',
    navigateScreen: 'PaymentDetails',
    navigateBackNavigation:()=> navigation.pop(),
    handleNavigation: screenName => navigation.navigate(screenName),
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <HeaderContainer
        label={'Your Subscription'}
        labels={props}
        showBackArrow={true}
        showLabel={true}
        showPopUp={true}
        showBackground={true}
        containerStyle={styles.headContainer}
        handleBackNavigation={props.navigateBackNavigation}

      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel logo={bucket} label={props.heading} headsize={18}/>
        </View>
        <CounterContainer />
        <View style={styles.buttonContainer}>
          <ButtonContainer {...props} />
          <Space />
          {/* <ButtonContainer {...props} /> */}
        </View>
      </View>
    </MainContainer>
  );
};
const CounterContainer = memo(({subHeading}) => (
  <View style={styles.counterContainer}>
    <Image
      source={plus}
      style={[globalStyles.logoImage, {width: 50, height: 50}]}
    />
    <View style={styles.counterValueContainer}>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.large, fontWeight: 'bold'},
        ]}>
        {8}
      </Text>
    </View>
    <Image
      source={minus}
      style={[globalStyles.logoImage, {width: 50, height: 50}]}
    />
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: Colors.primary,
  },
  headContainer: {
    flex: 0.2,
  },
  container: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 20,
    marginTop:-20

  },
  buttonContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    marginHorizontal:30
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  counterContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterValueContainer: {
    width: 120,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#ECE5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0.2,
  },
  card: {
    flex: 0.3,
    marginVertical: 10,
  },
  cardLogo: {
    height: 50,
    width: 50,
  },
});

export default memo(EmployeeAdd);

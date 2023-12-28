/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import clock from '../../storage/images/clock.png';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import InfoCard from '../../components/reusableComponents/InfoCard';
import Heading from '../../components/reusableComponents/Heading';
import CustomButton from '../../components/reusableComponents/CustomButton';
import {fonts} from 'react-native-elements/dist/config';
import {Fonts} from '../../constants/fonts';
import Space from '../../components/reusableComponents/Space';
import LogoWithLabel from '../../components/reusableComponents/LogoWithLabel';
import ModalView from '../../components/reusableComponents/ModalView';

const Home = ({navigation}) => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const props = {
    label: 'Forgot Password',
    heading: '8 Registered Employee',
    subHeading:
      'You currently have 8 registered employees, you can also add and delete more employers.',
    email: 'Email Id',
    buttonLabel1: 'Add/delete employee',
    buttonLabel2: 'Cancel Subscription',
    linkText: 'Resend OTP',
    navigateScreen: 'SubscriptionDescription',
    handleNavigation: (screenName, isModal) => {
      if (!isModal) {
        // Navigate to the SubscriptionDescription screen
        navigation.navigate(screenName);
      } else {
        // Open modal or perform other actions
        setIsConfirmationModalVisible(!isConfirmationModalVisible); // Set modal visibility to true
        // Perform other actions as needed
      }
    },
  };

  const confirnationModal = {
    label: 'Cancel Subscription',
    description: 'Are you sure! you want to cancel monitoring your employees? ',
  };

  const messageModal = {
    label: 'Your subscription plan has been canceled',
    description: 'Your subscription plan has been canceled',
  };

  const handleCancelCardNavigation = nextAction => {
    if (nextAction === 'OpenMessageModal') {
      setIsConfirmationModalVisible(false);
      setMessageModalVisible(true);
    } else if (nextAction === 'CancelConfirmationModal') {
      setMessageModalVisible(false);
      setIsConfirmationModalVisible(false);
    }
    else if (nextAction === 'CancelMessageModal') {
        setMessageModalVisible(false);
        setIsConfirmationModalVisible(false);
        navigation.navigate('OwnerHomeScreen');
      }
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>
      {children}
      {isConfirmationModalVisible && (
        <ModalView
          {...confirnationModal}
          isCancelCard={true}
          isMessageCard={false}
          handleCancelCardNavigation={handleCancelCardNavigation}></ModalView>
      )}

      {isMessageModalVisible && (
        <ModalView
          {...messageModal}
          isCancelCard={false}
          isMessageCard={true}
          handleCancelCardNavigation={handleCancelCardNavigation}
        />
      )}
    </View>
  );

  return (
    <MainContainer>
      <HeaderContainer
        label={'Your Subscription'}
        showBackArrow={true}
        showLabel={true}
        showPopUp={true}
        containerStyle={styles.headContainer}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel logo={clock} label={props.heading} />
          <HeadingContainer {...props} />
        </View>
        <ButtonsMixContainer {...props} />
      </View>
    </MainContainer>
  );
};
const HeadingContainer = memo(({subHeading}) => (
  <View style={styles.header}>
    <Heading label={subHeading} />
  </View>
));
const ButtonsMixContainer = memo(props => (
  <View style={styles.buttonContainer}>
    <ButtonContainer
      {...props}
      isModal={false}
      buttonLabel={props.buttonLabel1}
    />
    <Space />
    <ButtonContainer
      {...props}
      isModal={true}
      buttonLabel={props.buttonLabel2}
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
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 20,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'space-evenly',
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

export default memo(Home);

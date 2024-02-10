/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState,useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors} from '../../../constants/colors';
import clock from '../../../storage/images/clock.png';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import InfoCard from '../../../components/reusableComponents/InfoCard';
import Heading from '../../../components/reusableComponents/Heading';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {navigationPopUpList} from '../../../constants/navigation';
import Space from '../../../components/reusableComponents/Space';
import LogoWithLabel from '../../../components/reusableComponents/LogoWithLabel';
import ModalView from '../../../components/reusableComponents/ModalView';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import { useSelector } from 'react-redux';
import { useSubscriptionServiceHook } from '../../../services/hooks/subscription/useSubscriptionServiceHook';
import Spinner from '../../../components/reusableComponents/Spinner';

const Home = ({navigation}) => {
  const {subscription, caseType} = useSelector(
    state => state.subscriptionState,
  );
  const {loading, setLoading, fetchSubscriptionDataRequest,cancelSubscription} =
  useSubscriptionServiceHook();


  const {logoutRequest} = useAuthServiceHook();
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const heading = `${subscription.total_drivers} Registered Employee.`;
  const subheading = `You currently have ${subscription.total_drivers} registered employees, you can also add and delete more employers.`;
  const props = {
    label: 'Forgot Password',
    heading:heading,
    subHeading:subheading,
    email: 'Email Id',
    buttonLabel1: 'Subscribe',
    buttonLabel2: 'Cancel Subscription',
    linkText: 'Resend OTP',
    navigateScreen: 'SubscriptionDescription',
    navigateBackNavigation: () => navigation.pop(),
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

  useEffect(()=>{
    const response=fetchSubscriptionDataRequest();
  },[])
  const confirnationModal = {
    label: 'Cancel Subscription',
    description: 'Are you sure! you want to cancel monitoring your employees? ',
  };

  const messageModal = {
    label: 'Your subscription plan has been canceled',
    description: 'Your subscription plan has been canceled',
  };

  const handleCancelCardNavigation =async nextAction => {
    if (nextAction === 'OpenMessageModal') {
      setIsConfirmationModalVisible(false);
      setMessageModalVisible(true);
      setLoading(true);
      console.log("hh OpenMessageModal: ");
      const res= await cancelSubscription();
      setLoading(false);
      // if(res)
      // {
      //   setMessageModalVisible(true);
      // }


    //  setMessageModalVisible(true);
    } else if (nextAction === 'CancelConfirmationModal') {
      setMessageModalVisible(false);
      setIsConfirmationModalVisible(false);
    } else if (nextAction === 'CancelMessageModal') {
      console.log("hh CancelMessageModal: ");

      setMessageModalVisible(false);
      setIsConfirmationModalVisible(false);

     // navigation.navigate('OwnerHomeScreen');
    }
  };
  const handlePopUpNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    } else {
      navigation.navigate(navigateScreen);
    }
  };
  const labels = {
    navigateBackScreen: '',
    handleDirectNavigation: screenName => navigation.pop(),
  };
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
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
         {renderSpinner()}
      <HeaderContainer
        label={'Your Subscription'}
        labels={props}
        showBackArrow={true}
        showLabel={true}
        showPopUp={true}
        showBackground={true}
        containerStyle={styles.headContainer}
        handleBackNavigation={props.navigateBackNavigation}
        handleNavigation={handlePopUpNavigation}
        navigationPopUpList={navigationPopUpList}
      />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel logo={clock} label={props.heading} headsize={18} />
        </View>
        <HeadingContainer {...props} />
        <ButtonsMixContainer {...props} caseType={caseType} />
      </View>
    </MainContainer>
  );
};
const HeadingContainer = memo(({subHeading}) => (
  <View style={styles.header}>
    <Text style={[globalStyles.labelHeading, {fontWeight: '500'}]}>
      {subHeading}
    </Text>
  </View>
));
const ButtonsMixContainer = memo(props => (
  <View style={styles.buttonContainer}>
    {
      props.caseType !== "suscribe_as" ?
      ( <ButtonContainer
        {...props}
        isModal={false}
        buttonLabel={props.buttonLabel1}
      />):""
    }

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
  },
  headContainer: {
    flex: 0.1,
  },
  header: {
    marginVertical: 10,
    marginBottom: 20,
  },
  container: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: -20,
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

import React, {memo, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import success from '../../../storage/images/success.png';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {Fonts} from '../../../constants/fonts';
import Space from '../../../components/reusableComponents/Space';
import LogoWithLabel from '../../../components/reusableComponents/LogoWithLabel';
import {useSubscriptionServiceHook} from '../../../services/hooks/subscription/useSubscriptionServiceHook';

const SuccessScreen = ({navigation}) => {
  const {
    fetchSubscriptionDataRequest,
  } = useSubscriptionServiceHook();
  const props = {
    label: 'Total Payment',
    heading: 'Payment Successful!',
    buttonLabel: 'Done',
    navigateScreen: 'OwnerHomeScreen',
    handleNavigation: screenName => {
      navigation.pop();
      navigation.navigate(screenName);
    },
  };
  useEffect(() => {
    const response = fetchSubscriptionDataRequest();
  }, []);

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel logo={success} label={props.heading} headsize={35} />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonContainer {...props} />
        </View>
      </View>
    </MainContainer>
  );
};

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
  },

  container: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  logoContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(SuccessScreen);

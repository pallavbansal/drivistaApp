/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState} from 'react';
import {View, StyleSheet, Alert, Text, Linking} from 'react-native';
import bucket from '../../../storage/images/bucket.png';
import {WebView} from 'react-native-webview';
import plus from '../../../storage/images/plus.png';
import minus from '../../../storage/images/minus.png';
import wallet from '../../../storage/images/wallet.png';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {Fonts} from '../../../constants/fonts';
import Space from '../../../components/reusableComponents/Space';
import LogoWithLabel from '../../../components/reusableComponents/LogoWithLabel';
import {useStripe} from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';
import {useSubscriptionServiceHook} from '../../../services/hooks/subscription/useSubscriptionServiceHook';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import {navigationPopUpList} from '../../../constants/navigation';
import {useSelector} from 'react-redux';

const PaymentDetails = ({navigation}) => {
  const {subscription} = useSelector(state => state.subscriptionState);
  const {initPaymentSheet, presentPaymentSheet, redirectToCheckout} =
    useStripe();
  const {logoutRequest} = useAuthServiceHook();
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('');

  const {loading, setLoading, createCheckoutSession, createOrder} =
    useSubscriptionServiceHook();
    const total_payment=subscription.price;
    const subscription_cost_per_week=subscription.subscription_cost_per_week;
    const cost_per_driver=subscription.cost_per_driver;
  const [open, SetOpen] = useState(false);
  const props = {
    label: 'Total Payment',
    heading: 'Total Payment',
    total_price:total_payment,
    subscription_cost_per_week:subscription_cost_per_week,
    cost_per_driver:cost_per_driver,
    email: 'Email Id',
    buttonLabel: 'Subscribe',
    navigateScreen: 'SuccessScreen',
    navigateBackScreen: 'LoginScreen',
    navigateBackNavigation: () => navigation.pop(),
    // handleNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      onCheckout();
      SetOpen(true);
    },
  };

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createCheckoutSession();

    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }
    if (response) {
      setCheckoutUrl(response);
      setWebViewVisible(true);
    } else {
      console.error('Invalid URL');
    }
    // redirectToCheckout({
    //   response,
    // });
    // 4. If payment ok -> create the order
    // onCreateOrder();
  };
  const handlePopUpNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    } else {
      navigation.navigate(navigateScreen);
    }
  };
  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <>
      {!webViewVisible ? (
        <MainContainer>
          <HeaderContainer
            label={props.label}
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
              <LogoWithLabel
                logo={wallet}
                label={props.heading}
                headsize={20}
                width={100}
                height={100}
              />
            </View>
            <PaymentDetailsContainer {...props} />
            <View style={styles.buttonContainer}>
              <Space />
              <ButtonContainer {...props} />
            </View>
          </View>
        </MainContainer>
      ) : (
        ''
      )}

      {webViewVisible && (
        <WebView
          source={{uri: checkoutUrl}}
          style={{flex: 1}}
          onNavigationStateChange={navState => {
            // Handle navigation state change if needed
            console.log('oyeeeee navstate', navState);
            if (navState.title.includes("success")) {
              navigation.pop();
             navigation.navigate('SuccessScreen');
          } else {
              console.log("Title does not contain 'success'");
          }
          }}
          onError={error => {
            console.error('WebView error:', error);
          }}
        />
      )}
    </>
  );
};
const PaymentDetailsContainer = memo(({total_price,subscription_cost_per_week,cost_per_driver}) => (
  <View style={styles.paymentDetailsContainer}>
    <View style={styles.totalAmountContainer}>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.large, fontWeight: 'bold'},
        ]}>
        {'$'}{total_price}
      </Text>
    </View>
    <View style={styles.amountDetailsContainer}>
      <Text
        style={[
          globalStyles.text,
          {
            fontSize: Fonts.sizes.large,
            fontWeight: 'bold',
            alignSelf: 'center',
          },
        ]}>
        {subscription_cost_per_week}
      </Text>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.large, fontWeight: 'bold'},
        ]}>
        {cost_per_driver}
      </Text>
    </View>
  </View>
));

const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
    <Space />
    <Text
      style={[
        globalStyles.text,
        {fontSize: Fonts.sizes.small, textAlign: 'center'},
      ]}>
      {'Pay securely and save card to set-up recurring to payment '}
    </Text>
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: Colors.primary,
  },
  payContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 0.1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  paymentDetailsContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  totalAmountContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  amountDetailsContainer: {
    flex: 0.3,
  },
});

export default memo(PaymentDetails);

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import bucket from '../../storage/images/bucket.png';
import plus from '../../storage/images/plus.png';
import minus from '../../storage/images/minus.png';
import wallet from '../../storage/images/wallet.png';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import CustomButton from '../../components/reusableComponents/CustomButton';
import {Fonts} from '../../constants/fonts';
import Space from '../../components/reusableComponents/Space';
import LogoWithLabel from '../../components/reusableComponents/LogoWithLabel';

const PaymentDetails = ({navigation}) => {
  const props = {
    label:'Total Payment',
    heading: 'Total Payment',
    email: 'Email Id',
    buttonLabel: 'Subscribe',
    navigateScreen: 'SuccessScreen',
    handleNavigation: screenName => navigation.navigate(screenName),
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <HeaderContainer
        label={props.label}
        showBackArrow={true}
        showLabel={true}
        showPopUp={true}
        showBackground={true}
        containerStyle={styles.headContainer}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel logo={wallet} label={props.heading} />
        </View>
        <PaymentDetailsContainer />
        <View style={styles.buttonContainer}>
          <ButtonContainer {...props} />
        </View>
      </View>
    </MainContainer>
  );
};
const PaymentDetailsContainer = memo(({subHeading}) => (
  <View style={styles.paymentDetailsContainer}>
    <View style={styles.totalAmountContainer}>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.large, fontWeight: 'bold'},
        ]}>
        {'$ 18.48'}
      </Text>
    </View>
    <View style={styles.amountDetailsContainer}>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.large, fontWeight: 'bold',alignSelf:'center'},
        ]}>
        {'$18.5/per week'}
      </Text>
      <Text
        style={[
          globalStyles.text,
          {fontSize: Fonts.sizes.large, fontWeight: 'bold'},
        ]}>
        {'$2.31/per employee'}
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
          {fontSize: Fonts.sizes.small,alignSelf:'center'},
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
  headContainer: {
    flex: 0.2,
  },
  container: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 20,

  },
  buttonContainer: {
    flex: 0.4,
    justifyContent: 'center',

  },
  logoContainer: {
    flex: 0.3,
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

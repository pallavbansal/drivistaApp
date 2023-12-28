import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import success from '../../storage/images/success.png';
import plus from '../../storage/images/plus.png';
import minus from '../../storage/images/minus.png';
import wallet from '../../storage/images/wallet.png';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import CustomButton from '../../components/reusableComponents/CustomButton';
import {Fonts} from '../../constants/fonts';
import Space from '../../components/reusableComponents/Space';
import LogoWithLabel from '../../components/reusableComponents/LogoWithLabel';

const SuccessScreen = ({navigation}) => {
  const props = {
    label:'Total Payment',
    heading: 'Payment SuccessFul!',
    buttonLabel: 'Done',
    navigateScreen: 'SubscriptionScreen',
    handleNavigation: screenName => navigation.navigate(screenName),
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel logo={success} label={props.heading} />
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
    // backgroundColor: Colors.primary,
  },

  container: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 20,

  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',

  },
  logoContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',

  },

});

export default memo(SuccessScreen);

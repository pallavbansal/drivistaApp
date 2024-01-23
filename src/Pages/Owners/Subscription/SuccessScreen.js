import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import success from '../../../storage/images/success.png';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {Fonts} from '../../../constants/fonts';
import Space from '../../../components/reusableComponents/Space';
import LogoWithLabel from '../../../components/reusableComponents/LogoWithLabel';

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
    marginHorizontal:20
    // backgroundColor: Colors.primary,
  },

  container: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'white',
    padding: 20,


  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    marginHorizontal:20

  },
  logoContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',

  },

});

export default memo(SuccessScreen);

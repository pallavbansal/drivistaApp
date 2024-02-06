import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import internetConnectionFail from '../../storage/images/internetConnectionFail.png'


import {useSelector} from 'react-redux';
import LogoWithLabel from './LogoWithLabel';
import CustomButton from './CustomButton';
import { globalStyles } from '../../constants/globalStyles';
import { Fonts } from '../../constants/fonts';

const NotFound = ({navigation, navigateScreen}) => {
  const {isAuth} = useSelector(state => state.userState);
  const props = {
    label: 'Total Payment',
    heading: 'No Data Available',
    subheading:
      'There is no data to show you right now.',
    buttonLabel: 'Refresh',
    navigateScreen: 'SubscriptionScreen',
    handleNavigation: () =>
      navigation.navigate(isAuth ? 'OwnerHomeScreen' : 'StartUp'),
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel
            logo={internetConnectionFail}
            label={props.heading}
            headsize={20}
          />
          <Text
            style={[
              globalStyles.text,
              {
                color: 'grey',
                fontWeight: '500',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 10,
              },
            ]}>
            {props.subheading}
          </Text>
        </View>


      </View>
    </MainContainer>
  );
};



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
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
    marginHorizontal: 30,
  },
  logoContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(NotFound);

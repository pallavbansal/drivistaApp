import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import noInternet from '../storage/images/noInternet.png';
import LogoWithLabel from '../components/reusableComponents/LogoWithLabel';
import CustomButton from '../components/reusableComponents/CustomButton';
import {globalStyles} from '../constants/globalStyles';
import {Fonts} from '../constants/fonts';
import NetInfo from '@react-native-community/netinfo';

const NoInternet = ({navigation, navigateScreen}) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
    };

    checkConnection();
  }, []);

  const props = {
    label: 'Total Payment',
    heading: '  Whoops!',
    subheading:
      'No internet connection is found. Check your connection or try again.',
    buttonLabel: 'Refresh',
    navigateScreen: 'SubscriptionScreen',
    handleNavigation: async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        // Internet connection is available, navigate to the desired screen
        navigation.goBack();
      } else {
        // Still no internet connection, do nothing or display a message
      }
    },
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoWithLabel
            logo={noInternet}
            label={props.heading}
            headsize={20}
          />
          <Text
            style={[
              globalStyles.text,
              {
                color: 'grey',
                fontWeight: '500',
                fontSize: Fonts.sizes.small,
                textAlign: 'center',
                marginTop: 10,
              },
            ]}>
            {props.subheading}
          </Text>
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
    marginHorizontal: 30,
  },
  logoContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(NoInternet);

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo,useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import logoImage from '../storage/images/logo2.png';
import themeLogo from '../storage/images/theme.png';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';

const Splash = ({navigation}) => {
  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  useEffect(() => {
    // Use setTimeout to navigate after 3 seconds
    const timer = setTimeout(() => {
      // Replace 'Startup' with the name of your startup screen
      navigation.navigate('StartUp');
    }, 3000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <BackgroundContainer
      source={themeLogo}
    >
      <MainContainer >
        <Image
            source={logoImage}
            style={{height: 400, width: 400,display:'flex',alignItems:'center',justifyContent:'center'}}
        />

      </MainContainer>
    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'

  },

  imageBackground: {
    flex: 1,
     borderRadius: 12, // Add border radius here
    overflow:'hidden',
    justifyContent: 'flex-end',

  },
});

export default memo(Splash);

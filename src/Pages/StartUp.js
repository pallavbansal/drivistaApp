/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import NavigationCard from '../components/cards/NavigationCard';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import authUserLogo from '../storage/images/auth_user_logo.png';
import themeLogo from '../storage/images/theme.png';
import shade1 from '../storage/images/shade1.png';
import shade2 from '../storage/images/shade2.png';
import shade3 from '../storage/images/shade3.png';
import login_logo from '../storage/images/login_logo.png';
import driver_login from '../storage/images/driver_login.png';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';

const StartUp = ({navigation}) => {
  const navigationData = [
    {
      label: 'Manager Sign-up',
      linearGradientColor1: '#A47089',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'RegisterScreen',
      logoImage: authUserLogo,
      bgImage:shade1
    },
    {
      label: 'Manager Login',
      linearGradientColor1: '#70A48E',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'LoginScreen',
      logoImage: login_logo,
      bgImage:shade2
    },

    {
      label: 'Employee Login',
      linearGradientColor1: '#A4A270',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'LoginScreen',
      logoImage: driver_login,
      bgImage:shade3
    },
  ];
  const handleNavigation = (navigateScreen,item) => {
    navigation.navigate(navigateScreen, { type: item.label});
  };
  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  const CardContainer = ({children}) => (
    <View style={styles.cardContainer}>{children}</View>
  );

  return (
    <BackgroundContainer
      source={themeLogo}
    >
      <MainContainer >
      <HeaderContainer
          showPopUp={false}
          showBackArrow={false}
          showBackground={false}
          containerStyle={styles.headContainer}
        />
        <CardContainer>
          {navigationData.map((item, index) => (
            <NavigationCard
              key={index}
              {...item}
              cardLogo={styles.cardLogo}
              imageBackground={styles.imageBackground}
              cardStyle={styles.card}
              handleNavigation={() => handleNavigation(item.navigateScreen, item)}
            />
          ))}
        </CardContainer>

      </MainContainer>
    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,

  },
  headContainer:{
  flex:0.2,
  },
  cardContainer: {
    flex: 0.8,

    flexDirection:'column',
    justifyContent:'flex-start',

  },

  card: {
    flex: 0.25,
    marginVertical:10,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',


  },
  cardLogo: {
    height: 80,
    width: 80,
  },
  imageBackground: {
    flex: 1,
     borderRadius: 12, // Add border radius here
    overflow:'hidden',
    justifyContent: 'flex-end',

  },
});

export default memo(StartUp);

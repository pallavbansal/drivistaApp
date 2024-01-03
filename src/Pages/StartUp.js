/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Colors} from '../constants/colors';
import NavigationCard from '../components/cards/NavigationCard';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../components/reusableComponents/Container/FooterContainer';
import authUserLogo from '../storage/images/auth_user_logo.png';
import themeLogo from '../storage/images/theme.png';
import logo from '../storage/images/logo.png';
import shade1 from '../storage/images/shade1.png';
import shade2 from '../storage/images/shade2.png';
import shade3 from '../storage/images/shade3.png';
import wallet from '../storage/images/wallet.png';
import BackgroundContainer from '../components/reusableComponents/Container/BackgroundContainer';

const StartUp = ({navigation}) => {
  const navigationData = [
    {
      label: 'Owner Sign-up',
      linearGradientColor1: '#A47089',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'RegisterScreen',
      logoImage: authUserLogo,
      bgImage:shade1
    },
    {
      label: 'Owner Login',
      linearGradientColor1: '#70A48E',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'LoginScreen',
      logoImage: authUserLogo,
      bgImage:shade1
    },

    {
      label: 'Driver Login',
      linearGradientColor1: '#A4A270',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'LoginScreen',
      logoImage: authUserLogo,
      bgImage:shade1
    },
  ];
  const handleNavigation = navigateScreen => {
    navigation.navigate(navigateScreen);
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
              cardStyle={styles.card}
              handleNavigation={handleNavigation}
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
   // marginHorizontal:40,
    marginVertical:10,

    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor:'red'
  },
  cardLogo: {
    height: 60,
    width: 60,
  },
});

export default memo(StartUp);

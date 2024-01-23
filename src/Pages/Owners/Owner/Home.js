/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';
import NavigationCard from '../../../components/cards/NavigationCard';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../../components/reusableComponents/Container/FooterContainer';
import vehicleLogo from '../../../storage/images/vehicle.png';
import driverOnline from '../../../storage/images/driver_online.png';
import driver from '../../../storage/images/drivers.png';
import themeLogo from '../../../storage/images/theme.png';
import shade1 from '../../../storage/images/shade1.png';
import shade2 from '../../../storage/images/shade2.png';
import shade3 from '../../../storage/images/shade3.png';
import BackgroundContainer from '../../../components/reusableComponents/Container/BackgroundContainer';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import {navigationPopUpList} from '../../../constants/navigation';

const Home = ({navigation}) => {
  const {logoutRequest} = useAuthServiceHook();
  const navigationData = [
    {
      label: 'Employees Online',
      linearGradientColor1: '#A47089',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'OnlineDrivers',
      logoImage: driverOnline,
      bgImage: shade1,
    },
    {
      label: 'Your Vehicles',
      linearGradientColor1: '#70A48E',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'VehicleHome',
      logoImage: vehicleLogo,
      bgImage: shade2,
    },
    {
      label: 'Your Employees',
      linearGradientColor1: '#A4A270',
      linearGradientColor2: '#5A3C76',
      navigateScreen: 'DriverHome',
      logoImage: driver,
      bgImage: shade3,
    },
  ];
  const handleNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    } else {
      navigation.navigate(navigateScreen);
    }
  };

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  const CardContainer = ({children}) => (
    <View style={styles.cardContainer}>{children}</View>
  );

  return (
    <BackgroundContainer source={themeLogo}>
      <HeaderContainer
        showPopUp={true}
        showBackArrow={true}
        showBackground={false}
        containerStyle={styles.headContainer}
        handleNavigation={handleNavigation}
        navigationPopUpList={navigationPopUpList}
      />
      <CardContainer>
        {navigationData.map((item, index) => (
          <NavigationCard
            key={index}
            {...item}
            cardLogo={styles.cardLogo}
            imageBackground={styles.imageBackground}
            cardStyle={styles.card}
            handleNavigation={handleNavigation}
          />
        ))}
      </CardContainer>
    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headContainer: {
    flex: 0.2,
  },
  cardContainer: {
    flex: 0.8,

    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  card: {
    flex: 0.25,
    marginVertical: 10,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardLogo: {
    height: 150,
    width: 150,
    marginLeft: -50,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 12, // Add border radius here

    justifyContent: 'flex-end',
  },
});

export default memo(Home);

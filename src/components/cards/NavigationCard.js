/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../constants/globalStyles';
import auth_user_logo from '../../storage/images/auth_user_logo.png';

const NavigationCard = ({
  label,
  linearGradientColor1,
  linearGradientColor2,
  cardStyle,
  navigateScreen,
  handleNavigation,
  logoImage,
  cardLogo
}) => {
  const handleCardPress = () => {
    if (navigateScreen) {
      handleNavigation(navigateScreen);
    }
  };

  return (
    <TouchableOpacity style={cardStyle} onPress={handleCardPress}>
      <LinearGradient
        colors={[linearGradientColor1, linearGradientColor2]}
        locations={[0.1, 0.85]} // 100% at index 0, 82% at index 1
        style={[styles.container]}>
        <View style={styles.logoSection}>
          <Image
            source={logoImage}
            style={[globalStyles.logoImage, cardLogo]}
          />
        </View>
        <View style={styles.labelSection}>
          <Text
            style={[
              globalStyles.text,
              {color: 'white', fontWeight: 'bold', fontSize: 16},
            ]}>
            {label}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    padding: 10,

  },
  logoSection: {
    flex: 0.5,
  },
  labelSection: {
    flex: 0.5,
  },
});

export default NavigationCard;

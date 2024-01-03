import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

const NavigationCard = ({
  label,
  bgImage,
  cardStyle,
  navigateScreen,
  handleNavigation,
  logoImage,
  cardLogo,
}) => {
  const handleCardPress = () => {
    if (navigateScreen) {
      handleNavigation(navigateScreen);
    }
  };

  return (
    <TouchableOpacity style={cardStyle} onPress={handleCardPress}>
      <ImageBackground source={bgImage} style={styles.imageBackground}>
        <View style={styles.container}>
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
                { color: 'white', fontWeight: 'bold', fontSize: 16 },
              ]}
            >
              {label}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  container: {
    flex:1,
   flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent', // Optional: use a transparent background for the inner content
  },
  logoSection: {
    flex: 0.5,
  },
  labelSection: {
    flex: 0.5,
  },
});

export default NavigationCard;

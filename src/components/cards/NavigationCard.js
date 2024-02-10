import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Fonts} from '../../constants/fonts';

const NavigationCard = ({
  label,
  bgImage,
  cardStyle,
  navigateScreen,
  handleNavigation,
  imageBackground,
  logoImage,
  cardLogo,
}) => {
  const handleCardPress = () => {
    if (navigateScreen) {
      handleNavigation(navigateScreen);
    }
  };

  const labelParts = label.split(' ');

  return (
    <TouchableOpacity style={cardStyle} onPress={handleCardPress}>
      <View style={styles.imageContainer}>
        <ImageBackground source={bgImage} style={imageBackground}>
          <View style={styles.container}>
            <View style={styles.logoSection}>
              <Image
                source={logoImage}
                style={[globalStyles.logoImage, cardLogo]}
              />
            </View>
            <View style={styles.labelSection}>
              {labelParts.map((part, index) => (
                <Text
                  key={index}
                  style={[
                    globalStyles.text,
                    styles.labelText,
                    {color: 'white', fontWeight: 'bold', fontSize: 18},
                  ]}>
                  {index > 0 ? '' : ''} {part}
                </Text>
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
    backgroundColor: 'transparent', // Optional: use a transparent background for the inner content

  },
  imageContainer: {
    flex:1,
    // Apply border radius to the container
   // Ensure border radius is applied correctly
  //  marginLeft: -20, // Apply the negative margin here
  },
  logoSection: {
    flex: 0.5,

    overflow:'visible'
  },
  labelSection: {
    flex: 0.5,
  },
});

export default NavigationCard;

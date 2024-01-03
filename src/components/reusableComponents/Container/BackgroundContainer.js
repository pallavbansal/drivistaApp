import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';


const BackgroundContainer = ({ source, children }) => {
  return (
    <ImageBackground source={source} style={styles.backgroundImage} resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    // You can add more styles here as needed
  },
});

export default BackgroundContainer;

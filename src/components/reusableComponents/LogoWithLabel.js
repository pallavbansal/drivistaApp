/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import Space from './Space';

const LogoWithLabel = ({ label = 'label', logo = 'logo' ,headsize=28 ,width=180,height=180}) => {
  return (
    <View style={styles.wrapper}>
      <Image source={logo} style={[globalStyles.logo, { width: width, height: height }]} />
      <Text style={[globalStyles.text, styles.labelText, { fontSize: headsize }]}>
        {label}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column', // Change to column to stack the image and text vertically
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,

  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center', // Center the text
  },
});

export default LogoWithLabel;

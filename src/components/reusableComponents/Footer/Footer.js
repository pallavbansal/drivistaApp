import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2023 I Kalyan All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    fontFamily: 'Verdana',
    fontSize: 12,
    fontStyle: 'normal',
  },
});

export default Footer;

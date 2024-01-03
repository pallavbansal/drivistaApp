import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';

const AuthFooter = ({
  text,
  navigationText,
  handleDirectNavigation,
  footerNavigateScreen,
}) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{text}</Text>
      <TouchableOpacity
        onPress={() => {
          handleDirectNavigation(footerNavigateScreen);
        }}>
        <Text style={styles.navigationLinkText}> {navigationText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: Colors.primary,
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.small,
    fontStyle: Fonts.styles.regular,
  },
  navigationLinkText: {
    fontSize: Fonts.sizes.medium,
    fontWeight:Fonts.weight.bold,
    color: Colors.primary,
  },
});

export default AuthFooter;

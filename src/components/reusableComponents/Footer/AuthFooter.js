import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../../../constants/fonts';
import { Colors } from '../../../constants/colors'

const AuthFooter = ({text,navigationText}) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{text}</Text>
      <Text style={styles.navigationLinkText}>{' '}{navigationText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection:'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent:'center'
  },
  footerText: {
    color: Colors.primary,
    fontFamily: 'Verdana',
    fontSize: 12,
    fontStyle: 'normal',
  },
  navigationLinkText:{
    fontSize:Fonts.sizes.large,
    textTransform:'capitalize',
    color: Colors.primary,
  }
});

export default AuthFooter;

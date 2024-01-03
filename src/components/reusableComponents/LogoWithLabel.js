/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import { Fonts } from '../../constants/fonts';


const LogoWithLabel = ({label="label",logo="logo"}) => {
  return (

      <>
         <Image
            source={logo}
            style={[globalStyles.logo, {width: 100, height: 100}]}
          />
          <Text style={[globalStyles.text,{fontSize:Fonts.sizes.logoWithLabel,fontWeight:'bold'}]}>{label}</Text>
      </>

  );
};

const styles = StyleSheet.create({

  wrapper: {

    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,

  },
});

export default LogoWithLabel;

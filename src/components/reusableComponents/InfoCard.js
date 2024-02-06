/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';

const InfoCard = ({label="label",data="12PM" ,editShow, ...rest}) => {
  return (

      <View style={styles.wrapper}>
        <Text    style={[globalStyles.text, { fontWeight: 'bold'}]}>{label}</Text>
        <Text    style={[globalStyles.text,{color:Colors.primary}]}> : {data}</Text>
        {editShow === true && (
            <Image source={editImage} style={[globalStyles.logoImage,{marginLeft:5}]} />
          )}
      </View>

  );
};

const styles = StyleSheet.create({

  wrapper: {

    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 0,

  },
});

export default InfoCard;

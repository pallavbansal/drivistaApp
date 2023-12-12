/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';

const InfoCard = ({label="label",data="data" ,editShow, ...rest}) => {
  return (
    <View >
      <View style={styles.wrapper}>
        <Text    style={[globalStyles.text, { fontWeight: 'bold'}]}>{label}</Text>
        <Text    style={[globalStyles.text]}> : {data}</Text>
        {editShow === true && (
            <Image source={editImage} style={[globalStyles.logoImage,{marginLeft:5}]} />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  wrapper: {

    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 10,
    paddingHorizontal: 10,

  },
});

export default InfoCard;

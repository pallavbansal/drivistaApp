/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';

const BreakInfoCard = ({textName, time}) => {
  return (

      <View style={styles.wrapper}>
        <Text    style={[globalStyles.text, { fontWeight: 'bold'}]}>{textName}</Text>
        <Text    style={[globalStyles.text]}>{time}</Text>

      </View>

  );
};

const styles = StyleSheet.create({

  wrapper: {

    flexDirection: 'row',
     justifyContent:'space-between',
    flex:1,
  },
});

export default BreakInfoCard;

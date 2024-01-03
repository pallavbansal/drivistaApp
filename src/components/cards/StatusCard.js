/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';
import deleteImage from '../../storage/images/delete.png';
import onlineStatus from '../../storage/images/onlineStatus.png';
import { Fonts } from '../../constants/fonts';

const StatusCard = ({imageLink,label, onlinestatus,editShow,deleteShow,}) => {

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>

        <View  style={styles.labelSection}>
            <Image source={imageLink} style={[globalStyles.logoImage,{height:25,width:25,marginRight:10}]} />
            <Text
            style={[globalStyles.textInput,styles.bulletText]}
            >{label}</Text>
        </View>
        <View  style={styles.actionSection}>
        <View style={styles.actionSection}>
          {onlinestatus === true && (
            <Image source={onlineStatus} style={globalStyles.logoImage} />
          )}
          {editShow === true && (
            <Image source={editImage} style={globalStyles.logoImage} />
          )}
          {deleteShow === true && (
            <Image source={deleteImage} style={globalStyles.logoImage} />
          )}
        </View>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.inputWrapperBg, // Set the background color if needed
  },
  inputWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  labelSection:{
    flex:0.7,
    flexDirection: 'row',
    alignItems: 'center',

  },
  actionSection:{
    flex:0.3,
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  input: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
    bulletText: {
    fontSize: Fonts.sizes.medium,
    fontWeight:Fonts.weight.bold,
    // textTransform: 'capitalize',
    color: Colors.primary,
  },
});

export default StatusCard;

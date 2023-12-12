/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';
import deleteImage from '../../storage/images/delete.png';
import onlineStatus from '../../storage/images/onlineStatus.png';

const Card = ({imageLink,textName, onlinestatus,editShow,deleteShow}) => {

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>

        <View  style={styles.labelSection}>
            <Image source={imageLink} style={globalStyles.logoImage} />
            <Text
            style={globalStyles.textInput}
            >{textName}</Text>
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  inputWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputWrapperBg, // Set the background color if needed
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
});

export default Card;

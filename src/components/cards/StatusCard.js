/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';
import deleteImage from '../../storage/images/delete.png';
import onlineStatus from '../../storage/images/onlineStatus.png';


const StatusCard = ({
  id,
  imageLink,
  textName = 'test',
  status,
  editShow,
  deleteShow,
  handleDeleteItem,
  handleNavigation
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.labelSection} onPress={() => handleNavigation(id)}>
          <Image
            source={imageLink}
            style={[
              globalStyles.logoImage,
              {height: 25, width: 25, marginRight: 10},
            ]}
          />
          <Text style={[styles.bulletText]}>
            {textName}
          </Text>
        </TouchableOpacity>
        <View style={styles.actionSection}>
          <View style={styles.actionSection}>
            {status === "started" && (
              <Image source={onlineStatus} style={globalStyles.logoImage} />
            )}
            {editShow === true && (
               <TouchableOpacity onPress={() => handleNavigation(id)}>
               <Image
                 source={editImage}
                 style={[globalStyles.logoImage, {height: 20, width: 20,marginLeft:5}]}
               />
             </TouchableOpacity>
            )}
            {deleteShow === true && (
              <TouchableOpacity onPress={() => handleDeleteItem(id)}>
                <Image
                  source={deleteImage}
                  style={[globalStyles.logoImage, {height: 20, width: 20,marginLeft:5}]}
                />
              </TouchableOpacity>
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
  labelSection: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionSection: {
    flex: 0.3,
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
    fontSize: 16,
    fontWeight: 600,
    color: Colors.primary,
  },
});

export default StatusCard;

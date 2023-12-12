/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import editImage from '../../storage/images/edit.png';
import deleteImage from '../../storage/images/delete.png';
import onlineStatus from '../../storage/images/onlineStatus.png';


const SubscriptionPlanCard = ({
  imageLink,
  textName,
  onlinestatus,
  editShow,
  deleteShow,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text, {fontSize:16, color: 'white',marginVertical:10}]}>Silver</Text>
      <Text style={[globalStyles.text, { fontSize:16,color: 'white',marginVertical:10}]}>$ 9.99</Text>
      <Text style={[globalStyles.text, { fontSize:16,color: 'white',marginVertical:10}]}>Per Month</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 40,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    padding:10,
    backgroundColor: '#9dc1c4', // Set the background color if needed
  },
  wrapper: {
    // height: 40,
    width: 200,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionSection: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default SubscriptionPlanCard;

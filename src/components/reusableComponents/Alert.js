// CustomAlert.js

import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const Alert = ({visible, message, onClose, onOK}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.alertText}>{message}</Text>
          <TouchableOpacity onPress={onOK} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  alertText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    width: 20,
    height: 25,
    //backgroundColor:'red'
  },
  okButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  okButtonText: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Alert;

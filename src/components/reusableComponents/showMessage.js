import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const CustomFlashMessage = ({ message, description, status }) => {
  showMessage({
    message: '',
    description: '',
    type: status,
    renderCustomContent: () => (
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    ),
  });
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  message: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Verdana',

    fontStyle: 'italic',
  },
  description: {
    fontSize: 9,
    fontFamily: 'Verdana',
    fontStyle: 'italic',
  },
});

export default CustomFlashMessage;

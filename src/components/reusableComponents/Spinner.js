import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const Spinner = ({ visible }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#69ABC3" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default Spinner;

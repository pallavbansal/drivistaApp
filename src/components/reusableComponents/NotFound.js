import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Fonts} from '../../constants/fonts';
import notfound from '../../storage/images/notfound.jpg';

const NotFound = () => {
  return (
    <View style={styles.notfoundContainer}>
      <Image source={notfound} style={[globalStyles.notFoundImage]} />
    </View>
  );
};
const styles = StyleSheet.create({
  notfoundContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotFound;

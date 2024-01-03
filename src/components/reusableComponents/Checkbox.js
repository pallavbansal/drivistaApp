import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming Ionicons is used for the checkbox
import checked_checkbox from '../../storage/images/checked_checkbox.png';
import {globalStyles} from '../../constants/globalStyles';
import { Fonts } from '../../constants/fonts';

const Checkbox = ({label, onChange, initialValue = false}) => {
  const [checked, setChecked] = useState(initialValue);

  const handleCheckboxChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCheckboxChange}>
      {checked ? (
        <Image source={checked_checkbox} style={[globalStyles.logoImage]} />
      ) : (
        <View style={styles.checkbox}></View>
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderRadius: 1,
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.small,
    fontWeight:Fonts.weight.bold,
    marginLeft:10
  },
});

export default Checkbox;

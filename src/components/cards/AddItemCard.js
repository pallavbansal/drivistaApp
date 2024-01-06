/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import addNew from '../../storage/images/add_new.png';
import {Fonts} from '../../constants/fonts';

const AddItemCard = ({
  label="Item Name",
  handleAddItem
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.labelSection}>

          <Text style={[globalStyles.textInput, styles.bulletText]}>
            {label}
          </Text>
        </View>
        <View style={styles.actionSection}>
          <View>
          <TouchableOpacity onPress={handleAddItem}>
                <Image
                  source={addNew}
                  style={[globalStyles.logoImage, {height: 20, width: 20,marginLeft:5}]}
                />
              </TouchableOpacity>
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
    marginHorizontal: 25,
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
    fontSize: Fonts.sizes.medium,
    fontWeight: Fonts.weight.bold,
    // textTransform: 'capitalize',
    opacity:0.4,
    color: Colors.primary,
  },
});

export default AddItemCard;

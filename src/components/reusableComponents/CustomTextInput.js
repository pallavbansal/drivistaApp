/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, StyleSheet, Platform, Image} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import password_show from '../../storage/images/password_show.png';


const CustomTextInput = ({
  logoName,
  placeholder,
  showPasswordText,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.initialSection}>
          <Image source={logoName} style={globalStyles.logoImage} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholder}
            style={globalStyles.textInput}
            {...rest}
          />
        </View>

      {showPasswordText ? (
         <View style={styles.actionSection}>
         <Image source={password_show} style={globalStyles.logoImage} />
        </View>
        ) : null}

      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    marginVertical: 5,


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
  initialSection: {
    height: 40,
    flex:0.7,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputWrapperBg, // Set the background color if needed
  },
  actionSection:{
   flex:0.3,
   alignItems:'flex-end'
  },
  input: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default CustomTextInput;

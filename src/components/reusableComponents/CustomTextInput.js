/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import password_show from '../../storage/images/password_show.png';
import password_hide from '../../storage/images/password_hide.png';
import vehicle from '../../storage/images/vehicle.png';

const CustomTextInput = ({
  logoName,
  placeholder,
  showPasswordGenIcon = false,
  handlePasswordVisiblity,
  passwordVisible,
  value,
  errorText = '',
  keyboardType="default",
  type="text",
  ...rest

}) => {
  const textInputRef = useRef(null);

  const handlePress = () => {
    textInputRef.current.focus();
  };

  return (
    <View>
      <View style={styles.errorContainer}>
        {errorText.length > 0 && ( // Conditionally render error message
          <View>
            <Text style={globalStyles.errorText}>{errorText}</Text>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.initialSection}
            activeOpacity={1}
            onPress={handlePress}>
            {logoName ? (
              <Image source={logoName} style={globalStyles.logoImage} />
            ) : (
              ''
            )}

            <TextInput
              secureTextEntry={showPasswordGenIcon ? !passwordVisible : false}
              value={value}
              ref={textInputRef}
              placeholderTextColor={Colors.placeholder}
              color='black'
              keyboardType={keyboardType}
              placeholder={placeholder}
              maxLength={type === "number" ? 10 :30}
              style={[globalStyles.textInput, styles.customTextInput]}
              {...rest}
            />
          </TouchableOpacity>
          {showPasswordGenIcon ? (
            <TouchableOpacity
              style={styles.actionSection}
              onPress={handlePasswordVisiblity}>
              <Image
                source={passwordVisible ? password_show : password_hide}
                style={globalStyles.logoImage}
              />
            </TouchableOpacity>
          ) : null}
        </View>
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
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputWrapperBg, // Set the background color if needed
  },
  initialSection: {
    height: 40,
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,

    backgroundColor: Colors.inputWrapperBg, // Set the background color if needed
  },
  actionSection: {
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 40,
    paddingRight: 5,
  },
  errorContainer: {
    height: 20,
    marginTop: 0,
    marginBottom: -1,
    //backgroundColor:'blue'
  },
  input: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  customTextInput: {
    flex:1,
    fontFamily: 'Alata', // Replace with your actual font family
    fontWeight: '400',
    marginBottom:-1,

  },
});

export default CustomTextInput;

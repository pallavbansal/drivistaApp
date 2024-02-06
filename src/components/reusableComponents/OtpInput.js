import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ length, onComplete, setOtp, otp }) => {
  const inputs = new Array(length).fill(null);
  const inputRefs = inputs.map(() => useRef(null));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs[index + 1].current.focus();
    }

    const completed = newOtp.every(item => item !== '');
    // if (completed) {
    //   onComplete(newOtp.join(''));
    // }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          color="black"
          placeholderTextColor={'black'}
          ref={inputRefs[index]}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => handleChange(text, index)}
          value={value}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    margin: 5,
  },
});

export default OtpInput;

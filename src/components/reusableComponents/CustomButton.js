/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';

const CustomButton = props => {
  const {onPress = () => console.log('Pressed'), style} = props;

  switch (props.layout) {
    case '2':
      return Button2();

    default:
      return Button();
  }

  function Button() {
    if (props.isVisible) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity
          style={[styles.buttonStyle, style || {}]}
          onPress={props.handleNavigation}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={[globalStyles.text, {color: 'white', fontWeight: 'bold'}]}>
            {props.buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function Button2() {
    return (
      <View style={[styles.button2Style, style || {}]}>
        <TouchableOpacity onPress={() => onPress()}>
          <Text style={styles.text2Style}>{props.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 45,
    //width:'100%',
    borderRadius: 20,
    backgroundColor: '#412160',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
    fontFamily: 'Verdana',
    fontSize: 9,
    fontStyle: 'italic',
  },
  button2Style: {
    height: 40,
    //width:'100%',
    borderRadius: 20,
    borderColor: '#69ABC3',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
  },
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Verdana',
    fontSize: 9,
    fontStyle: 'italic',
  },
  text2Style: {
    color: '#666666',
    fontWeight: '700',
  },
});

export default CustomButton;

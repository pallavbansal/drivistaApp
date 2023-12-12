/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts} from './fonts';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
    fontFamily: Fonts.family,
    fontStyle: Fonts.styles.regular,

  },
  labelHeading: {
    fontSize: Fonts.sizes.medium,
    fontFamily: Fonts.family,
    fontStyle: Fonts.styles.regular,
    textAlign: 'center',
  },
  text: {
    fontSize: Fonts.sizes.small,
    fontFamily: Fonts.family,
    fontStyle: Fonts.styles.regular,
  },
  textInput: {
    fontSize: Fonts.sizes.small,
    fontFamily: Fonts.family,
    fontStyle: Fonts.styles.regular,
  },
  inputTextWrap: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.small,
    fontStyle: Fonts.styles.regular,
    height: 45,
  },
  fileInputTextWrap: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.small,
    fontStyle: Fonts.styles.regular,
  },
  logoImage: {
    width: 15,
    height: 15,

  },
});

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
  buttonText:{
    fontSize: 16,
    fontFamily: Fonts.family,
    fontStyle: Fonts.styles.regular,
  },
  textInput: {
    fontSize: Fonts.sizes.textInput,
    fontFamily: Fonts.family,
    fontStyle: Fonts.styles.regular,
    opacity:0.7,


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
    width: 20,
    height: 20,

  },
  notFoundImage: {
    width: 250,
    height: 250,

  },
  errorText: {
    color: 'red',
    fontSize: Fonts.sizes.small,
    marginTop: 5,
    fontStyle: Fonts.styles.regular,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,

  },
});

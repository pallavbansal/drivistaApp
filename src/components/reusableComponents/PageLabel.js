import React from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import { Fonts } from '../../constants/fonts';

const PageLabel = ({label}) => {
  return (
    <Text style={[globalStyles.labelHeading, {color: 'white', fontWeight: '400', fontSize: Fonts.sizes.large}]}>{label}</Text>
  );
};

export default PageLabel;

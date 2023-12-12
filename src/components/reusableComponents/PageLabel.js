import React from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';

const PageLabel = ({label}) => {
  return (
    <Text style={[globalStyles.labelHeading, {color: 'white', fontWeight: 'bold', fontSize: 20}]}>{label}</Text>
  );
};

export default PageLabel;

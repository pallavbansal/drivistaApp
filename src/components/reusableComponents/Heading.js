import React from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';

const Heading = ({label}) => {
  return (
    <Text style={[globalStyles.labelHeading, {color: 'black'}]}>{label}</Text>
  );
};

export default Heading;

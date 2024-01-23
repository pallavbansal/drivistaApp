import React from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';

const Heading = ({label, color = 'black'}) => {
  return (
    <Text style={[globalStyles.labelHeading, {color: color}]}>{label}</Text>
  );
};

export default Heading;

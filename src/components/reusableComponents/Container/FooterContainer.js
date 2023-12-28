import React from 'react';
import {View,Text} from 'react-native';

const FooterContainer = ({containerStyle, text}) => {
  return <View style={containerStyle}>
    <Text>
    {text}
    </Text>

    </View>;
};

export default FooterContainer;

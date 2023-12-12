import React from 'react';
import {View} from 'react-native';

const Left = (props) => {

    const defaultStyle = {
        justifyContent: 'flex-start', 
        flex: props.flex || 0.5, 
        flexDirection: props.flexDirection || 'row',
        alignItems: 'flex-start'
    };

    return (
        <View style={[defaultStyle, props.style]}>{props.children}</View>
    );
}
export default Left;
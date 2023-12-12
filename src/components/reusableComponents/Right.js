import React from 'react';
import {View} from 'react-native';

const Right = (props) => {
    
    return (
        <View style={{
            justifyContent: props.align || 'flex-end', 
            flex: props.flex || 0.5, 
            flexDirection: 'row',
            alignItems: 'center'
        }}>{props.children}</View>
    );
}
export default Right;

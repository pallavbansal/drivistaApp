import React from 'react';
import {Text} from 'react-native';

const Subheading  = (props) =>{
    
    const {style,label} = props;
    const defaultStyle = {
        // fontFamily: config.headingFont,
        fontSize: 16,
        marginBottom: 10,
        color: '#000000'
    };

    return (
        <Text style={[defaultStyle, style]}>{props.label}</Text>
    );
}

export default Subheading;
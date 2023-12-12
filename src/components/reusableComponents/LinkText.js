import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';

const LinkText  = (props) =>{
    
    const {onPress,style,label} = props;
    const defaultStyle = {
        // fontFamily: config.headingFont,
        fontWeight:'700',
        fontSize: 12,
        marginVertical: 10,
        color: '#69ABC3',
        textAlign:'right', 
        flex:1
    };

    return (
        <View>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={() => onPress()}>
                <Text style={[defaultStyle, style]}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LinkText;
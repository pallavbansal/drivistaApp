import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function FloatingButton() {
  const navigation = useNavigation();
  function SampleFunction(){
    // alert("Floating Button Clicked");
    navigation.navigate('PostUpload')
  }

    return (

        <TouchableOpacity activeOpacity={0.5} onPress={()=> SampleFunction() } style={styles.TouchableOpacityStyle} >

          <Image source={require('../storage/images/Floating_button.png')} 
          
                 style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

  TouchableOpacityStyle:{

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});
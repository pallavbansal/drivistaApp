import React from 'react';
import { StyleSheet,ActivityIndicator,View } from 'react-native';

export default function Loader(props) {
    // console.log(props.loadingtrue);
  return (
         <ActivityIndicator size="large" color="#69ABC3" style={props.loadingtrue == '1' ? styles.open : styles.close} />
  );
}
const styles = StyleSheet.create({
    open:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex:1,
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    close:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
  });
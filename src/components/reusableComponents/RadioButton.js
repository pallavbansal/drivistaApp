import React, { useState } from 'react';
import { View, Text, Pressable,StyleSheet,Image } from 'react-native';

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View style={{flexDirection:'row'}}>
      {data.map((item) => {
        return (
                <Pressable style={ item.value === userOption ? styles.selected : styles.unselected }
                    onPress={() => selectHandler(item.value)}>
                    <Image
                        source={item.label == 'Boy'? require('../storage/images/boy.png') : require('../storage/images/girl.png')}
                        style={{height: 25, width: 25,alignself:'center',marginVertical:'2%',justifyContent:'center'}}
                    />
                    {/* <Text style={ item.value === userOption ? styles.Selectedoption : styles.Unselectedoption }> {item.value}</Text> */}
                </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
    Selectedoption: {
        fontSize: 11,
        color: '#ffffff',
        fontWeight:'700'
      //   textAlign: 'center',
      },
      Unselectedoption: {
        fontSize: 11,
        color: '#000000',
        fontWeight:'700'
      //   textAlign: 'center',
      },
    unselected: {
      height:35,width:35,
      backgroundColor: '#E8E8E8',
      color:'#000000',
      marginLeft: 10,
      padding: 5,
      borderRadius: 20,
    },
    selected: {
      height:35,width:35,
      backgroundColor: '#69ABC3',
      marginLeft: 10,
      padding: 5,
      borderRadius: 20,
    },
  });
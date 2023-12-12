import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';

const NavigationPopUpCard = ({navigationPopUpList, handleNavigation}) => {
  const handlePress = navigateScreen => {
    handleNavigation(navigateScreen);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {navigationPopUpList.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.button,
              {backgroundColor: index === 0 ? Colors.headerBg : 'white'},
            ]}
            onPress={() => handleNavigation(item.navigateScreen)}>
            <Text
              style={[
                globalStyles.text,
                {
                  color: item.label === 'profile' ? 'white' : Colors.headerBg,
                  fontWeight: 'bold',
                },
              ]}>
              {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    width: '50%',
    marginRight: 10,
    marginLeft: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: 100,
    alignItems: 'center',
  },
});

export default NavigationPopUpCard;

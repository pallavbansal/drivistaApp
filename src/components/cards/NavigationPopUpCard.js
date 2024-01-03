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
    elevation: 999,
  },
  modalView: {
    width: '30%',
    marginTop: -10,
    marginRight: 10,
    marginLeft: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
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
    padding: 5,
    width: '95%',
    alignItems: 'flex-start',
  },
});

export default NavigationPopUpCard;

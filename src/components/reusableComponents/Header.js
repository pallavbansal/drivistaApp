import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';
import left_arrow from '../../storage/images/left_arrow.png';
import menu from '../../storage/images/menu.png';
import NavigationPopUpCard from '../cards/NavigationPopUpCard'; // Import your NavigationPopUpCard component here

const Header = ({
  textName,
  showChildren,
  showBackArrow = false,
  showPopUp = false,
  showLabel = false,
  navigationPopUpList,
  handleNavigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  let leftArrowComponent = null;
  if (showBackArrow) {
    leftArrowComponent = (
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={left_arrow}
          style={[globalStyles.logoImage, {marginLeft: 5}]}
        />
      </TouchableOpacity>
    );
  }

  let labelComponent = null;
  if (showLabel) {
    labelComponent = (
      <Text style={[globalStyles.text, {fontWeight: 'bold', color: 'white'}]}>
        {textName}
      </Text>
    );
  }

  let PopUpNavigationComponent = null;
  if (showPopUp) {
    PopUpNavigationComponent = (
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={menu}
          style={[globalStyles.logoImage, {marginLeft: 5}]}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={[styles.wrapper, showBackArrow && styles.borderStyle]}>
        <View style={styles.backArrow}>{leftArrowComponent}</View>
        <View style={styles.label}>{labelComponent}</View>
        <View style={styles.popUpLogo}>{PopUpNavigationComponent}</View>
      </View>
      {modalVisible && (
        <NavigationPopUpCard
          navigationPopUpList={navigationPopUpList}
          handleNavigation={handleNavigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.headerBg, // Set the background color if needed
    paddingVertical: 10,
  },
  borderStyle: {
    // borderWidth: 1,
    // borderColor: 'white',
  },
  backArrow: {
    flex: 0.3,
  },
  label: {
    flex: 0.4,
    alignItems: 'center',
  },
  popUpLogo: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});

export default Header;

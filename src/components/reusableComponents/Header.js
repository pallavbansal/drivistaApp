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
import {Fonts} from '../../constants/fonts';

const Header = ({
  textName,
  labels,
  showChildren,
  showBackArrow = false,
  showPopUp = false,
  showLabel = false,
  showBackground = false,
  navigationPopUpList,
  handleNavigation,
  handleBackNavigation,
  modalStyle
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handlePopUpNavigation = screenName => {
    setModalVisible(false);
    handleNavigation(screenName);
  };

  let wrapperStyle = styles.wrapper; // Default wrapper style

  if (showBackground) {
    wrapperStyle = {
      ...styles.wrapper,
      backgroundColor: Colors.headerBg, // Set your desired background color
    };
  }

  let leftArrowComponent = null;
  if (showBackArrow) {
    leftArrowComponent = (
      <TouchableOpacity
        onPress={() => handleBackNavigation(labels.navigateBackScreen)}>
        <Image
          source={left_arrow}
          style={[
            globalStyles.logoImage,
            {width: 25, height: 25, marginLeft: 5},
          ]}
        />
      </TouchableOpacity>
    );
  }

  let labelComponent = null;
  if (showLabel) {
    labelComponent = (
      <Text style={[globalStyles.text, styles.headerLabel]}>{textName}</Text>
    );
  }

  let PopUpNavigationComponent = null;
  if (showPopUp) {
    PopUpNavigationComponent = (
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={menu}
          style={[
            globalStyles.logoImage,
            {width: 25, height: 25, marginLeft: 5, marginTop: 4},
          ]}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View
        style={[
          styles.wrapper,
          showBackground && styles.backgroundTransparent,
        ]}>
        <TouchableOpacity style={styles.backArrow}>
          {leftArrowComponent}
        </TouchableOpacity>
        <View style={styles.label}>
          <Text style={styles.headerLabel}>{labelComponent}</Text>
        </View>
        <View style={styles.popUpLogo}>{PopUpNavigationComponent}</View>
      </View>
      {modalVisible && (
        <NavigationPopUpCard
        modalStyle={modalStyle}
          navigationPopUpList={navigationPopUpList}
          handleNavigation={handlePopUpNavigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // backgroundColor: Colors.headerBg, // Set the background color if needed
    paddingVertical: 15,
  },
  backgroundTransparent: {
    backgroundColor: Colors.headerBg,
  },
  backArrow: {
    flex: 0.3,
    justifyContent: 'center',
    marginTop: 2,
  },
  label: {
    flex: 0.5,

    alignItems: 'center',
  },
  popUpLogo: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: Fonts.weight.bold,
    color: 'white',
  },
});

export default Header;

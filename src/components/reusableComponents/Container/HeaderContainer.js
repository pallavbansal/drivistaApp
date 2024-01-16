import React from 'react';
import {View} from 'react-native';
import Header from '../Header';

const HeaderContainer = ({
  containerStyle,
  label = 'Label',
  labels,
  showLabel = false,
  showBackArrow = false,
  showBackground=false,
  showPopUp = false,
  handleNavigation,
  handleBackNavigation,
  navigationPopUpList
}) => {


  return (
    <View style={containerStyle}>
      <Header
        textName={label}
        labels={labels}
        navigationPopUpList={navigationPopUpList}
        showLabel={showLabel}
        showBackArrow={showBackArrow}
        showPopUp={showPopUp}
        showBackground={showBackground}
        handleNavigation={handleNavigation}
        handleBackNavigation={handleBackNavigation}
      />
    </View>
  );
};

export default HeaderContainer;

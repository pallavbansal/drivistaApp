import React from 'react';
import {View} from 'react-native';
import Header from '../Header';

const HeaderContainer = ({
  containerStyle,
  label = 'Label',
  showLabel = false,
  showBackArrow = false,
  showBackground=false,
  showPopUp = false,
  handleNavigation,
}) => {
  const navigationPopUpList = [
    {
      label: 'profile',
      navigateScreen: 'ProfileScreen',

    },
    {
      label: 'subscription',
      navigateScreen: 'ReminderScreen',
    },

    {
      label: 'logout',
      navigateScreen: 'logout',
    },
  ];

  return (
    <View style={containerStyle}>
      <Header
        textName={label}
        navigationPopUpList={navigationPopUpList}
        showLabel={showLabel}
        showBackArrow={showBackArrow}
        showPopUp={showPopUp}
        showBackground={showBackground}
        handleNavigation={handleNavigation}
      />
    </View>
  );
};

export default HeaderContainer;

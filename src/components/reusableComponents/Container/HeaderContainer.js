import React from 'react';
import {View} from 'react-native';
import Header from '../Header';

const HeaderContainer = ({
  containerStyle,
  label = 'Label',
  showLabel = false,
  showBackArrow = false,
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
      navigateScreen: 'ProfileScreen',
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
        handleNavigation={handleNavigation}
      />
    </View>
  );
};

export default HeaderContainer;

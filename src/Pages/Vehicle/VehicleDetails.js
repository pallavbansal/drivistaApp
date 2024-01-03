/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import ProfileComponent from '../../components/reusableComponents/Profile';
import FooterContainer from '../../components/reusableComponents/Container/FooterContainer';

import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../../components/reusableComponents/CustomButton';


const VehicleDetails = ({route, navigation}) => {
  const {
    headLabel = 'Vehicle Details',
    type = 'Default Type',
    details = [
      {
        label: 'Email',
        data: 'kabir343@gmail.com',
      },
      {
        label: 'Mobile Number',
        data: '9867656767',
      },
    ],
  } = route.params;
  const props = {
    buttonLabel: 'Save',
    navigateScreen: 'SuccessScreen',
    handleNavigation: screenName => navigation.navigate(screenName),
  };
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer
        label={'Vehicle Details'}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        showPopUp={true}
        containerStyle={styles.headContainer}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ProfileComponent caseType={'vehicle_profile'} details={details} headerLabel={headLabel} />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonContainer {...props} />
        </View>
      </View>
    </View>
  );
};
const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headContainer: {
    flex: 0.2,
  },
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.8,
  },
  buttonContainer: {
    flex: 0.2,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    flex: 1,
  },
});

export default memo(VehicleDetails);

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import ProfileComponent from '../../components/reusableComponents/Profile';
import FooterContainer from '../../components/reusableComponents/Container/FooterContainer';

import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../../components/reusableComponents/CustomButton';
import Vehicle from '../../components/reusableComponents/Profile/Vehicle';
import {useVehicleServiceHook} from '../../services/hooks/vehicle/useVehicleServiceHook';

const VehicleDetails = ({route, navigation}) => {
  const {
    loading,
    setLoading,
    vehicleNumber,
    setVehicleNumber,
    vehicleName,
    setVehicleName,
    driverName,
    setDriverName,
    vehicleDetailsEditRequest
  } = useVehicleServiceHook();
  const {
    headLabel = 'Vehicle Details',
    type = 'Default Type',
    details = [],
  } = route.params;
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    setVehicleName(details.vehicle_name);
    setVehicleNumber(details.vehicle_number);
    setDriverName(details.driver_name);
  }, [details]);

  const props = {
    buttonLabel: 'Save',
    navigateScreen: 'SuccessScreen',
    // handleNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      setLoading(true);
      const response = await vehicleDetailsEditRequest(details.id);
      setLoading(false);
      try {
         if (response.result === 'success') {
          Alert.alert('Success');
        } else if (response.result === 'failed') {
          Alert.alert(response.message);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  };
  const labels = {
    label:'Vehicle Details',
    navigateBackScreen: '',
    handleDirectNavigation: screenName => navigation.pop(),
  };
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer
      labels={labels}
        label={labels.label}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        showPopUp={false}
        containerStyle={styles.headContainer}
        handleBackNavigation={labels.handleDirectNavigation}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Vehicle
            details={details}
            editable={editable}
            setEditable={setEditable}
            vehicleName={vehicleName}
            setVehicleName={setVehicleName}
            vehicleNumber={vehicleNumber}
            setVehicleNumber={setVehicleNumber}
            driverName={driverName}
            setDriverName={setDriverName}
          />
        </View>
        {
          editable ? (
            <View style={styles.buttonContainer}>
            <ButtonContainer {...props} />
          </View>
          ):""
        }

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

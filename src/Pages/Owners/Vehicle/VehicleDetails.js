/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {useVehicleServiceHook} from '../../../services/hooks/vehicle/useVehicleServiceHook';
import Vehicles from '../../../components/reusableComponents/Profile/Vehicles';
import {navigationPopUpList} from '../../../constants/navigation';
import { useAuthServiceHook } from '../../../services/hooks/auth/useAuthServiceHook';
import Alert from '../../../components/reusableComponents/Alert';

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
    alertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    showAlert,
    closeAlert,
    handleOK,
    vehicleDetailsEditRequest,
  } = useVehicleServiceHook();
  const {logoutRequest} = useAuthServiceHook();
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
         navigation.pop();
        } else if (response.result === 'failed') {
          showAlert(response.message);
        }
      } catch (error) {
        showAlert('No Internet Connection');
        console.error('vehicle error:', error);
      }
    },
  };
  const labels = {
    label: 'Vehicle Details',
    navigateBackScreen: '',
    handleDirectNavigation: screenName => navigation.pop(),
  };
  const handlePopUpNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    } else {
      navigation.navigate(navigateScreen);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer
        labels={labels}
        label={labels.label}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        showPopUp={true}
        containerStyle={styles.headContainer}
        handleBackNavigation={labels.handleDirectNavigation}
        navigationPopUpList={navigationPopUpList}
        handleNavigation={handlePopUpNavigation}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Vehicles
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

      </View>
      {editable ? (
        <View style={styles.buttonContainer}>
          <ButtonContainer {...props} />
        </View>
      ) : (
        ''
      )}
        <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
      />
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
  headContainer: {},
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.8,
  },
  buttonContainer: {
    marginBottom: 50,
    flex: 0.1,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    flex: 1,
  },
});

export default memo(VehicleDetails);

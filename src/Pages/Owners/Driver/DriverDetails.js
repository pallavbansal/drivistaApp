/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {useDriverServiceHook} from '../../../services/hooks/driver/useDriverServiceHook';
import Drivers from '../../../components/reusableComponents/Profile/Drivers';
import Space from '../../../components/reusableComponents/Space';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import {navigationPopUpList} from '../../../constants/navigation';

const DriverDetails = ({route, navigation}) => {
  const {
    setLoading,
    loading,
    fetchDriverListRequest,
    deleteDriverRequest,
    saveDriverRequest,
    email,
    setEmail,
    mobileNumber,
    setFirstName,
    firstName,
    lastName,
    setLastName,
    setMobileNumber,
    password,
    setPasssword,
    driverDetailsEditRequest,
  } = useDriverServiceHook();
  const {logoutRequest} = useAuthServiceHook();
  const {
    headLabel = 'Vehicle Details',
    type = 'Default Type',
    details = [],
  } = route.params;
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    setFirstName(details.first_name);
    setLastName(details.last_number);
    setEmail(details.email);
    setMobileNumber(details.mobile_number);
    setPasssword(details.password);
  }, [details]);

  const handleCalender = id => {
    navigation.navigate('CalenderScreen',{id:details.id});
  };

  const props = {
    buttonLabel: 'Save',
    navigateScreen: 'SuccessScreen',
    // handleNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      setLoading(true);
      const response = await driverDetailsEditRequest(details.id);
      setLoading(false);
      try {
        if (response.result === 'success') {
        //  Alert.alert('Success');
        navigation.pop();
        } else if (response.result === 'failed') {
          Alert.alert(response.message);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  };
  const labels = {
    label: 'Employee Details',
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
        showPopUp={false}
        containerStyle={styles.headContainer}
        handleNavigation={handlePopUpNavigation}
        handleBackNavigation={labels.handleDirectNavigation}
        navigationPopUpList={navigationPopUpList}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Drivers
            details={details}
            editable={editable}
            setEditable={setEditable}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPasssword={setPasssword}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            handleCalender={handleCalender}
          />
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Name"
          value={vehicleName}
          onChangeText={text =>setVehicleName(text)}
        /> */}
      </View>

      {editable ? (
        <View style={styles.buttonContainer}>
          <ButtonContainer {...props} />
        </View>
      ) : (
        ''
      )}
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
    flex: 0.7,
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

export default memo(DriverDetails);

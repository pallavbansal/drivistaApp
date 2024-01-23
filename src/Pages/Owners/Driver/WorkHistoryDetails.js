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
import WorkHistory from '../../../components/reusableComponents/Profile/WorkHistory';

const WorkHistoryDetails = ({route, navigation}) => {
  const {
    setLoading,
    loading,
    shiftStartTime,
    setShiftStartTime,
    shiftEndTime,
    setShiftEndTime,
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
    workHistoryDetailsRequest,
    driverDetailsEditRequest,
  } = useDriverServiceHook();
  const {logoutRequest} = useAuthServiceHook();

  const {driver_id, date} = route.params;
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await workHistoryDetailsRequest(driver_id, date);

      setDetails(response.data);
    };
    fetchDetails();
  }, []);
  useEffect(() => {
    if (details && details.driver) {
      console.log('Driver first name:', details.driver.first_name);
      setFirstName(details.driver.first_name);
      // setLastName(details.driver.last_name);
    }

    // Rest of your code
  }, [details]);


  const handleCalender = id => {
    navigation.navigate('CalenderScreen');
  };

  const props = {
    buttonLabel: 'Save',
    navigateScreen: 'SuccessScreen',
    // handleNavigation: screenName => navigation.navigate(screenName),
    handleNavigation: async screenName => {
      setLoading(true);
      const response = await driverDetailsEditRequest('details.id');
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
    label: 'Work History',
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
        {
  details && details.shift_details ? (
    <WorkHistory
      details={details}
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
    //   handleCalender={handleCalender}
    />
  ) : null
}


        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Name"
          value={vehicleName}
          onChangeText={text =>setVehicleName(text)}
        /> */}
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
    backgroundColor:'white'
  },
  headContainer: {},
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.9,
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

export default memo(WorkHistoryDetails);

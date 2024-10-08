/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {useDriverServiceHook} from '../../../services/hooks/driver/useDriverServiceHook';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import {navigationPopUpList} from '../../../constants/navigation';
import WorkHistory from '../../../components/reusableComponents/Profile/WorkHistory';
import Spinner from '../../../components/reusableComponents/Spinner';

const WorkHistoryDetails = ({route, navigation}) => {
  const {
    setLoading,
    loading,
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
  } = useDriverServiceHook();
  const {logoutRequest} = useAuthServiceHook();

  const {driver_id, date} = route.params;
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const response = await workHistoryDetailsRequest(driver_id, date);
      setLoading(false);
      setDetails(response.data);
    };
    fetchDetails();
  }, []);
  useEffect(() => {
    if (details && details.driver) {
      console.log('Driver first name:', details.driver.first_name);
      setFirstName(details.driver.first_name);
    }

    // Rest of your code
  }, [details]);

  const handleCalender = id => {
    navigation.navigate('CalenderScreen');
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
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };
  return (
    <View style={styles.mainContainer}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        label={labels.label}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        showPopUp={true}
        containerStyle={styles.headContainer}
        handleNavigation={handlePopUpNavigation}
        handleBackNavigation={labels.handleDirectNavigation}
        navigationPopUpList={navigationPopUpList}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {details && details.shift_details ? (
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
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity,Alert} from 'react-native';
//import {OwnerProfilComponent} from '../components/reusableComponents/Profile/Owner';
import Owner from '../components/reusableComponents/Profile/Owner';
import FooterContainer from '../components/reusableComponents/Container/FooterContainer';
import {globalStyles} from '../constants/globalStyles';
import {Fonts} from '../constants/fonts';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import {useDriverOnlineServiceHook} from '../services/hooks/auth/useDriverOnlineServiceHook';
import {useSelector} from 'react-redux';
import Spinner from '../components/reusableComponents/Spinner';
import { useAuthServiceHook } from '../services/hooks/auth/useAuthServiceHook';
import { Colors } from '../constants/colors';


const Profile = ({route, navigation}) => {
  const {user} = useSelector(state => state.userState);
   const [editable, setEditable] = useState(false);
  console.log('redux user data:', user);
  //const [details,setDetails]=useState({});
  const {
    loading,
    setLoading,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    fetchProfileRequest,
    setFirstName,
    firstName,
    lastName,
    setLastName,
    updateUserProfileRequest,

  } = useDriverOnlineServiceHook();
  const {
   logoutRequest

  } = useAuthServiceHook();

  const handleUpdateUserProfileRequest=async ()=>{
    setLoading(true);
    const response = await updateUserProfileRequest();
    if(response.result === "failed")
    { setEditable(true);
      Alert.alert(response.message)
    }
    else if(response.result === "unauthenticated")
    {
      logoutRequest();
    }
    setLoading(false);
  }
  useEffect(() => {
    setEmail(user.email);
    setMobileNumber(user.mobile_number);
    setLastName(user.last_name);
    setFirstName(user.first_name);
  }, [user]);
  console.log('mobile number:', mobileNumber);

  useEffect(() => {
    fetchProfileRequest();
  }, []);

  const labels = {
    label: 'Edit Profile',
    heading:
      'Please enter your valid email address, we will send you a 4-digit code to verify.',
    email: 'Email Id',
    buttonLabel: 'Login',
    password: 'Password',
    authFooterText: 'Do not have an account?',
    linkText: 'Register',
    navigateScreen: 'OwnerHomeScreen',
    footerNavigateScreen: 'RegisterScreen',
    handleBackNavigation:()=> navigation.pop(),
    handleDirectNavigation: screenName => navigation.navigate(screenName),
  };
  const handleBackArrow=()=>{

  }
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {renderSpinner()}
      <HeaderContainer
        label={'Profile'}
        labels={labels}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        containerStyle={styles.headContainer}
        handleBackArrow={handleBackArrow}
        handleBackNavigation={labels.handleBackNavigation}
      />
      <View style={styles.profileContainer}>
        <Owner
          caseType={'user_profile'}
          labels={labels}
          loading={loading}
          setLoading={setLoading}
          details={user}
          email={email}
          setEmail={setEmail}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          setFirstName={setFirstName}
          firstName={firstName}
          lastName={lastName}
          setLastName={setLastName}
          editable={editable}
          setEditable={setEditable}
          updateUserProfileRequest={handleUpdateUserProfileRequest}
          headerLabel={labels.headLabel}
        />

        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() =>
            navigation.navigate('ChangePassword', {
              caseType: 'profile',
              id: '10',
              verification_uid: '70',
            })
          }>
          <Text
            style={[
              globalStyles.text,
              {fontSize: 20, fontWeight: 'bold',color:Colors.primary},
            ]}>
            {'Change password ?'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    flex: 0.1,
  },
  profileContainer: {
    flex: 0.9,
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#B0ACAC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
  },

  footerContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Profile);

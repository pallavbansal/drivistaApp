/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import ProfileComponent from '../components/reusableComponents/Profile';
import FooterContainer from '../components/reusableComponents/Container/FooterContainer';
import {globalStyles} from '../constants/globalStyles';
import {Fonts} from '../constants/fonts';
import HeaderContainer from '../components/reusableComponents/Container/HeaderContainer';
import {useDriverOnlineServiceHook} from '../services/hooks/auth/useDriverOnlineServiceHook';
import {useSelector} from 'react-redux';

const Profile = ({route, navigation}) => {
  const {user} = useSelector(state => state.userState);
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
  } = useDriverOnlineServiceHook();

  useEffect(() => {
    setEmail(user.email);
    setMobileNumber(user.mobile_number);
  }, [user]);

  useEffect(() => {
    fetchProfileRequest();
  }, []);

  const data = {
    headLabel: 'Profile',
    type: 'Default Type',
    details: [
      {
        label: 'Email',
        data: 'kabir343@gmail.com',
      },
      {
        label: 'Mobile Number',
        data: '9867656767',
      },
    ],
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderContainer
        label={'Profile'}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        containerStyle={styles.headContainer}
      />
      <View style={styles.profileContainer}>
        <ProfileComponent
          caseType={'user_profile'}
          details={user}
          email={email}
          setEmail={setEmail}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          headerLabel={data.headLabel}
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
              {fontSize: Fonts.sizes.medium, fontWeight: 'bold'},
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
